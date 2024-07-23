import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import { TableNames, MediaType } from "../_shared/constants.ts";
import { deepCopyWithSnakeCase } from "../_shared/deepCopyWithSnakeCase.ts";

async function cacheItems(client: SupabaseClient, items: any[]) {
  const entriesToUpsert = items
    .map(deepCopyWithSnakeCase)
    .map((v) => ({ ...v, data: v })) // Assign data property first to allow deconstruction
    .map(({ id, title, published_date, image_link, data }) => ({
      google_book_id: id,
      created_at: new Date().toISOString(),
      title,
      published_date,
      image_link,
      data,
    }));
  const mediaKeys = entriesToUpsert.map((v) => {
    return { media_specific_id: v.google_book_id, media_type: MediaType.BOOK };
  });

  const { data: mediaMap, error: mediaError } = await client
    .from(TableNames.MEDIA)
    .upsert(mediaKeys, {
      onConflict: "media_specific_id,media_type",
      ignoreDuplicates: false,
    })
    .select("media_id");

  if (mediaError) {
    console.error("Error inserting media map", mediaError);
    throw new Error(`Error inserting media map: ${mediaError}`);
  }

  const { error } = await client
    .from(TableNames.BOOKS_CACHE_TABLE)
    .upsert(entriesToUpsert, {
      defaultToNull: true,
      onConflict: "google_books_id,media_type",
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

  const GOOGLE_API_KEY = Deno.env.get("GOOGLE_API_KEY");
  if (!GOOGLE_API_KEY) throw new Error("GOOGLE_API_KEY is not defined");

  let { query, index } = await req.json();
  if (!index) index = 0;

  if (!query) {
    return new Response(JSON.stringify({ error: "Missing parameter: query" }), {
      status: 400,
    });
  }

  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_API_KEY}&q=${encodeURIComponent(
      query
    )}&startIndex=${index}`
  );
  const resBody = await res.json();
  if (resBody.error) {
    return new Response(JSON.stringify(resBody), {
      status: resBody.error.code,
    });
  }

  // Cache items, return media_ids
  const cache = await cacheItems(adminSupabaseClient, resBody.items);

  // Map book keys to match schema and add media_id
  return new Response(
    JSON.stringify({
      ...resBody,
      items: resBody.items
        .map(deepCopyWithSnakeCase)
        .map((v: any, idx: number) => ({
          ...v,
          media_id: cache[idx].media_id,
        })),
    })
  );
});
