import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { ALLOWED_OMDB_TYPES, OMDBType } from "../_shared/constants.ts";

Deno.serve(async (req: Request) => {
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
  if (!resBody.Error) return new Response(JSON.stringify(resBody));

  const titleRes = await fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${query}&type=${mediaType}`,
  );
  const titleResBody = await titleRes.json();

  // Return 404 when error returned by title API
  if (titleResBody.Error) {
    return new Response(JSON.stringify(titleResBody), { status: 404 });
  }

  // Format data so it matches the search API
  return new Response(JSON.stringify({ Search: [titleResBody] }));

  // const supabaseClient: SupabaseClient = createClient(
  //   Deno.env.get("SUPABASE_URL") ?? "",
  //   Deno.env.get("SUPABASE_ANON_KEY") ?? "",
  //   {
  //     global: { headers: { Authorization: req.headers.get("Authorization")! } },
  //   },
  // );

  // const adminSupabaseClient = createClient(
  //   Deno.env.get("SUPABASE_URL") ?? "",
  //   Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  //   {
  //     global: {
  //       headers: {
  //         Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
  //       },
  //     },
  //   },
  // );

  // const authHeader = req.headers.get("Authorization")!;
  // const token = authHeader.replace("Bearer ", "");
  // const user = await supabaseClient.auth.getUser(token);

  // if (!user || !user.data.user) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

  // const body = await req.json();

  // const searchQueries = body.search as { mediaType: string; imdbId: string }[];

  // .forEach(async (searchQuery) => {
  //   const { mediaType, imdbId } = searchQuery;

  // });

  // return new Response(JSON.stringify({ error: "Invalid type" }), {
  //   status: 400,
  // });
});
