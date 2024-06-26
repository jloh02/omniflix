import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import {
  ALLOWED_OMDB_TYPES,
  OMDBType,
  TableNames,
} from "../_shared/constants.ts";
import { Tables, TablesInsert } from "../_shared/types.gen.ts";
import { mapMovieKeys } from "../_shared/movieKeys.ts";

const CACHE_DURATION_MS = 1000 * 60 * 60 * 24; // 1 day

// TODO handle different types
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

  const OMDB_API_KEY = Deno.env.get("OMDB_API_KEY");
  if (!OMDB_API_KEY) throw new Error("OMDB_API_KEY is not defined");

  const { id, type } = await req.json();

  const errorStr: string[] = [];
  if (!id) errorStr.push("id");
  if (!type) errorStr.push("type");
  if (errorStr.length > 0) {
    return new Response(
      JSON.stringify({
        error: "Missing params: " + errorStr.map((x) => `'${x}'`).join(", "),
      }),
      { status: 400 }
    );
  }

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

  if (typeof id !== "number" || id <= 0) {
    return new Response(
      JSON.stringify({
        error: `Invalid id ${id} (${typeof id}). Must be a number > 0.`,
      }),
      { status: 400 }
    );
  }

  // Continue with the rest of the code...

  const cacheLimit = Date.now() - CACHE_DURATION_MS;
  const { data, error } = await adminSupabaseClient
    .from(TableNames.MOVIES_CACHE_TABLE)
    .select(`*, ${TableNames.MEDIA}!inner(media_id)`)
    .eq(`${TableNames.MEDIA}.media_id`, id)
    .returns<Tables<TableNames.MOVIES_CACHE_TABLE>[]>()
    .single();

  if (error) console.error(error);

  // Return cached value if valid cache
  if (
    !error &&
    data.created_at &&
    new Date(data.created_at).getTime() > cacheLimit
  ) {
    return new Response(JSON.stringify({ ...data, media_id: id }));
  }

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${data?.imdb_id}&type=${mediaType}&plot=full`
  );
  const resBody = await res.json();
  if (resBody.Error) {
    console.error(resBody.Error);
    return new Response(JSON.stringify({ error: resBody.Error }), {
      status: 404,
    });
  }

  const processBody = mapMovieKeys(resBody);

  const returnResult = {
    created_at: new Date().toISOString(),
    imdb_id: processBody.imdb_id,
    data: processBody,
    genre: (processBody.genre ?? "").split(", "),
    imdb_rating: processBody.imdb_rating,
    poster_url: processBody.poster_url,
    rated: processBody.rated,
    released: processBody.released,
    runtime: (processBody.runtime ?? "0").replace(" min", ""),
    title: processBody.title,
    year: processBody.year,
  };

  const { error: cacheError } = await adminSupabaseClient
    .from(TableNames.MOVIES_CACHE_TABLE)
    .update([returnResult])
    .eq("imdb_id", returnResult.imdb_id)
    .returns<TablesInsert<TableNames.MOVIES_CACHE_TABLE>[]>();

  if (cacheError) {
    console.error("Error inserting data", cacheError);
  }

  return new Response(JSON.stringify({ ...returnResult, media_id: id }));
});
