import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import { objectKeysToLowerCase } from "../_shared/objectKeysToLowerCase.ts";
import {
  ALLOWED_OMDB_TYPES,
  OMDBType,
  TableNames,
} from "../_shared/constants.ts";
import { Tables, TablesInsert } from "../_shared/types.gen.ts";

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

  const cacheLimit = Date.now() - CACHE_DURATION_MS;
  const { data, error } = await adminSupabaseClient
    .from(TableNames.MOVIES_CACHE_TABLE)
    .select("*")
    .eq("imdb_id", id)
    .returns<Tables<TableNames.MOVIES_CACHE_TABLE>[]>()
    .single();

  // Return cached value if valid cache
  console.log(error, data, cacheLimit);
  if (
    !error &&
    data.created_at &&
    new Date(data.created_at).getTime() > cacheLimit
  ) {
    return new Response(JSON.stringify(data));
  }

  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&type=${mediaType}`
  );
  const resBody = await res.json();
  if (resBody.Error) {
    return new Response(JSON.stringify({ error: resBody.Error }), {
      status: 404,
    });
  }

  const processBody = objectKeysToLowerCase(resBody);

  const returnResult: Tables<TableNames.MOVIES_CACHE_TABLE> = {
    created_at: new Date().toISOString(),
    imdb_id: processBody.imdb_id,
    data: processBody,
    genre: processBody.genre.split(", "),
    imdb_rating: processBody.imdbRating,
    poster_url: processBody.poster_url,
    rated: processBody.rated,
    released: processBody.released,
    runtime: processBody.runtime.replace(" min", ""),
    title: processBody.title,
    year: processBody.year,
  };

  const { error: cacheError } = await adminSupabaseClient
    .from(TableNames.MOVIES_CACHE_TABLE)
    .update([returnResult])
    .eq("imdb_id", id)
    .returns<TablesInsert<TableNames.MOVIES_CACHE_TABLE>[]>();

  if (cacheError) {
    console.error("Error inserting data", cacheError);
  }

  return new Response(JSON.stringify(returnResult));
});
