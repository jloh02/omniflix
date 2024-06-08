import {
  assertEquals,
  assertExists,
  assertNotEquals,
  assertStringIncludes,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import "https://deno.land/std@0.224.0/dotenv/load.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

if (!supabaseUrl) throw new Error("supabaseUrl is required.");
if (!supabaseKey) throw new Error("supabaseKey is required.");

const options = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
};

async function testError(
  client: SupabaseClient,
  body: object,
  assertions: (errorMsg: string) => void
) {
  const res = await client.functions.invoke("search-omdb", {
    body,
  });
  assertExists(res.error);
  assertEquals(res.error.name, "FunctionsHttpError");
  const { error: errorMsg } = await res.error.context.json();
  assertions(errorMsg);
}

async function testSuccess(
  client: SupabaseClient,
  body: object,
  assertions: (body: any) => void | Promise<void>
) {
  const res = await client.functions.invoke("search-omdb", {
    body,
  });
  assertEquals(res.error, null);
  assertExists(res.data);
  await assertions(JSON.parse(res.data));
}

const testSearchOmdb = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options
  );

  await testError(client, {}, (errorMsg) => {
    assertStringIncludes(errorMsg, "Missing params");
    assertStringIncludes(errorMsg, "query");
    assertStringIncludes(errorMsg, "type");
  });
  await testError(client, { type: "movie" }, (errorMsg) => {
    assertStringIncludes(errorMsg, "Missing params");
    assertStringIncludes(errorMsg, "query");
  });
  await testError(client, { query: "query" }, (errorMsg) => {
    assertStringIncludes(errorMsg, "Missing params");
    assertStringIncludes(errorMsg, "type");
  });
  await testError(client, { query: "query", type: "invalid" }, (errorMsg) => {
    assertStringIncludes(errorMsg, "Invalid type");
  });

  await testSuccess(client, { query: "John", type: "movie" }, (body) => {
    assertExists(body["Search"]);
    assertNotEquals(body["Search"].length, 0);
  });

  await testSuccess(client, { query: "it", type: "movie" }, (body) => {
    assertExists(body["Search"]);
    assertEquals(body["Search"].length, 1);
  });

  await testSuccess(client, { query: "lion", type: "movie" }, async (body1) => {
    assertExists(body1["Search"]);
    assertNotEquals(body1["Search"].length, 0);

    await testSuccess(
      client,
      { query: "lion", type: "movie", page: "2" },
      (body2) => {
        assertExists(body2["Search"]);
        assertNotEquals(body2["Search"].length, 0);
        assertNotEquals(body1.Search[0].title, body2.Search[0].title);
      }
    );
  });
};

Deno.test("Search OMDB Test", testSearchOmdb);
