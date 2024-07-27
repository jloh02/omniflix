import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import {
  GOOGLE_BOOK_CACHE_DURATION_MS,
  TableNames,
} from "../_shared/constants.ts";
import { deepCopyWithSnakeCase } from "../_shared/deepCopyWithSnakeCase.ts";

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

  const { id } = await req.json();

  // Ensure required params are present: must have 'id' and 'type'
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing parameter: id" }), {
      status: 400,
    });
  }

  // Ensure the 'id' is a positive integer
  if (typeof id !== "number" || id <= 0) {
    return new Response(
      JSON.stringify({
        error: `Invalid id ${id} (${typeof id}). Must be a number > 0.`,
      }),
      { status: 400 }
    );
  }

  // Check cache for existing data
  const cacheLimit = Date.now() - GOOGLE_BOOK_CACHE_DURATION_MS;
  const { data, error } = await adminSupabaseClient
    .from(TableNames.BOOKS_CACHE_TABLE)
    .select(`*, ${TableNames.MEDIA}!inner(media_id)`)
    .eq(`${TableNames.MEDIA}.media_id`, id)
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
    `https://www.googleapis.com/books/v1/volumes/${id}?key=${GOOGLE_API_KEY}`
  );
  const resBody = await res.json();
  if (resBody.error) {
    console.error(resBody.error);
    return new Response(JSON.stringify({ error: resBody.error }), {
      status: resBody.error.code,
    });
  }

  const processBody = deepCopyWithSnakeCase(resBody);
  const { title, published_date, image_link } = processBody;

  const returnResult = {
    created_at: new Date().toISOString(),
    google_book_id: processBody.id,
    title,
    published_date,
    image_link,
    data: processBody,
  };

  const { error: cacheError } = await adminSupabaseClient
    .from(TableNames.BOOKS_CACHE_TABLE)
    .update([returnResult])
    .eq("google_book_id", returnResult.google_book_id);

  if (cacheError) {
    console.error("Error inserting data", cacheError);
  }

  return new Response(JSON.stringify({ ...returnResult, media_id: id }));
});
