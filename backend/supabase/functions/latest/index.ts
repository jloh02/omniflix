import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import {
  ALLOWED_OMDB_TYPES,
  OMDB_CACHE_DURATION_MS,
  OMDB_TYPE_TO_TMDB_TYPE,
  OMDBType,
} from "../_shared/constants.ts";
import { TableNames } from "../_shared/constants.ts";
import { OMDB_TYPE_TO_MEDIA_TYPE } from "../_shared/constants.ts";

Deno.serve(async (req: Request) => {
  const adminSupabaseClient: SupabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    {
      global: {
        headers: {
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
      },
    }
  );

  const TMDB_API_KEY = Deno.env.get("TMDB_API_KEY");
  if (!TMDB_API_KEY) throw new Error("TMDB_API_KEY is not defined");

  const { type } = await req.json();

  const mediaType = ALLOWED_OMDB_TYPES.find(
    (validType) => validType === type
  ) as OMDBType;
  if (!mediaType) {
    return new Response(
      JSON.stringify({
        error: "Invalid type. Allowed types: " + ALLOWED_OMDB_TYPES.join(", "),
      }),
      { status: 400 }
    );
  }

  const supabaseMediaType = OMDB_TYPE_TO_MEDIA_TYPE[mediaType];
  const lastUpdate = await adminSupabaseClient
    .from(TableNames.UPCOMING)
    .select("*")
    .eq("media_type", supabaseMediaType)
    .single();
  if (
    !lastUpdate.error &&
    lastUpdate &&
    lastUpdate.data &&
    new Date(lastUpdate.data.created_at).getTime() >
      Date.now() - OMDB_CACHE_DURATION_MS
  ) {
    return new Response(JSON.stringify({ success: true, cacheUsed: "true" }), {
      status: 200,
    });
  }

  const tmdbType = OMDB_TYPE_TO_TMDB_TYPE[mediaType];

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/${tmdbType}?api_key=${TMDB_API_KEY}`
  );
  const resBody = await res.json();
  if (!resBody.results) {
    return new Response(JSON.stringify(resBody), { status: 404 });
  }

  const tmdbIds = resBody.results.map((item: any) => item.id);

  const insertedMediaIds = (
    await Promise.all(
      tmdbIds.map(async (id: string) => {
        const tmdbIdRes = await fetch(
          `https://api.themoviedb.org/3/${tmdbType}/${id}/external_ids?api_key=${TMDB_API_KEY}`
        );
        const tmdbIdResBody = await tmdbIdRes.json();
        if (!tmdbIdResBody.imdb_id) return;

        const res = await adminSupabaseClient.functions.invoke("search-omdb", {
          body: {
            type: mediaType,
            search_by_imdb_id: true,
            query: tmdbIdResBody.imdb_id,
          },
        });

        if (res.error || !res.data) {
          console.error(res.error, res.data);
          return;
        }

        return JSON.parse(res.data).Search[0].media_id;
      })
    )
  ).filter((x) => x); // Remove undefined values

  const { error } = await adminSupabaseClient.from(TableNames.UPCOMING).upsert(
    {
      media_type: supabaseMediaType,
      upcoming: insertedMediaIds,
      created_at: new Date().toISOString(),
    },
    { onConflict: "media_type", ignoreDuplicates: false }
  );

  if (error) {
    console.error(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
