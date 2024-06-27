import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import {
  ALLOWED_OMDB_TYPES,
  OMDB_TYPE_TO_TABLE,
  OMDBType,
  TableNames,
} from "../_shared/constants.ts";
import { mapOmdbKeys } from "../_shared/omdbKeys.ts";

async function cacheItems(
  client: SupabaseClient,
  items: any[],
  type: OMDBType
) {
  const CACHE_TABLE = OMDB_TYPE_TO_TABLE[type];

  const entriesToUpsert = items.map(mapOmdbKeys);
  const imdbKeys = entriesToUpsert.map((v) => {
    return { media_specific_id: v.imdb_id, media_type: type };
  });

  const { data: mediaMap, error: mediaError } = await client
    .from(TableNames.MEDIA)
    .upsert(imdbKeys, {
      onConflict: "media_specific_id,media_type",
      ignoreDuplicates: false,
    })
    .select("media_id");

  if (mediaError) {
    console.error("Error inserting media map", mediaError);
    throw new Error(`Error inserting media map: ${mediaError}`);
  }

  const { error } = await client.from(CACHE_TABLE).upsert(entriesToUpsert, {
    defaultToNull: true,
    onConflict: "imdb_id,media_type",
    ignoreDuplicates: false,
  });

  if (error) {
    console.error("Error upserting data", error);
  }

  return mediaMap;
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
    }
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

  // Handle searches that returns "too many results" (https://github.com/omdbapi/OMDb-API/issues/190)
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&page=${page}&type=${mediaType}`
  );
  const resBody = await res.json();
  if (!resBody.Error) {
    // Cache items, return media_ids
    const cache = await cacheItems(adminSupabaseClient, resBody.Search, type);

    // Map movie keys to match schema and add media_id
    return new Response(
      JSON.stringify({
        ...resBody,
        Search: resBody.Search.map(mapOmdbKeys).map((v: any, idx: number) => ({
          ...v,
          media_id: cache[idx].media_id,
        })),
      })
    );
  }

  const titleRes = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${query}&type=${mediaType}`
  );
  const titleResBody = await titleRes.json();

  // Return 404 when error returned by title API
  if (titleResBody.Error) {
    return new Response(JSON.stringify(titleResBody), { status: 404 });
  }

  // Format data so it matches the search API
  const cache = await cacheItems(adminSupabaseClient, [titleResBody], type);
  return new Response(
    JSON.stringify({
      Search: [{ ...mapOmdbKeys(titleResBody), media_id: cache[0].media_id }],
    })
  );
});
