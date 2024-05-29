import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import {
  ALLOWED_OMDB_TYPES,
  OMDBType,
  TableNames,
} from "../_shared/constants.ts";
import { Tables } from "../_shared/types.gen.ts";

//TODO handle type for various movies, series, episodes
async function cacheItems(
  client: SupabaseClient,
  items: any[],
  type: OMDBType,
) {
  const entriesToUpsert = items.map((item) => {
    return {
      imdb_id: item.imdbID,
      poster_url: item.Poster,
      title: item.Title,
      year: item.Year,
    };
  });

  const { error } = await client.from(
    TableNames.MOVIES_CACHE_TABLE,
  )
    .upsert(entriesToUpsert, {
      defaultToNull: true,
      onConflict: "imdb_id",
      ignoreDuplicates: true,
    })
    .returns<Tables<TableNames.MOVIES_CACHE_TABLE>>();

  if (error) {
    console.error("Error upserting data", error);
  }
}

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
    },
  );

  const OMDB_API_KEY = Deno.env.get("OMDB_API_KEY");
  if (!OMDB_API_KEY) throw new Error("OMDB_API_KEY is not defined");

  let { query, page, type } = await req.json();
  if (!page) page = 1;

  const errorStr: string[] = [];
  if (!query) errorStr.push("query");
  if (!type) errorStr.push("type");
  if (errorStr.length > 0) {
    return new Response(
      JSON.stringify({
        error: "Missing params: " + errorStr.map((x) => `'${x}'`).join(", "),
      }),
      { status: 400 },
    );
  }

  const mediaType = ALLOWED_OMDB_TYPES.find(
    (validType) => validType === type,
  ) as OMDBType;
  if (!mediaType) {
    return new Response(
      JSON.stringify({
        error: "Invalid type. Allowed types: " + ALLOWED_OMDB_TYPES.join(", "),
      }),
      { status: 400 },
    );
  }

  // Handle searches that returns "too many results" (https://github.com/omdbapi/OMDb-API/issues/190)
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&page=${page}&type=${mediaType}`,
  );
  const resBody = await res.json();
  if (!resBody.Error) {
    await cacheItems(adminSupabaseClient, resBody.Search, type);
    return new Response(JSON.stringify(resBody));
  }

  const titleRes = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${query}&type=${mediaType}`,
  );
  const titleResBody = await titleRes.json();

  // Return 404 when error returned by title API
  if (titleResBody.Error) {
    return new Response(JSON.stringify(titleResBody), { status: 404 });
  }

  // Format data so it matches the search API
  await cacheItems(adminSupabaseClient, [titleResBody], type);
  return new Response(JSON.stringify({ Search: [titleResBody] }));
});
