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
  const res = await client.functions.invoke("omdb-details", {
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
  const res = await client.functions.invoke("omdb-details", {
    body,
  });
  assertEquals(res.error, null);
  assertExists(res.data);
  await assertions(JSON.parse(res.data));
}

const testOmdbDetails = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options
  );

  await testError(client, {}, (errorMsg) => {
    assertStringIncludes(errorMsg, "Missing params");
    assertStringIncludes(errorMsg, "id");
    assertStringIncludes(errorMsg, "type");
  });
  await testError(client, { type: "movie" }, (errorMsg) => {
    assertStringIncludes(errorMsg, "Missing params");
    assertStringIncludes(errorMsg, "id");
  });
  await testError(client, { id: "query" }, (errorMsg) => {
    assertStringIncludes(errorMsg, "Missing params");
    assertStringIncludes(errorMsg, "type");
  });
  await testError(client, { id: "tt0000000", type: "invalid" }, (errorMsg) => {
    assertStringIncludes(errorMsg, "Invalid type");
  });

  await testError(client, { id: "tt0000000", type: "movie" }, (errorMsg) => {
    assertStringIncludes(errorMsg, "Error");
  });

  await testSuccess(client, { id: "tt0363771", type: "movie" }, (body) => {
    assertExists(body["rated"]);
    assertExists(body["released"]);
    assertExists(body["runtime"]);
    assertExists(body["genre"]);
    assertExists(body["data"]);
  });
};

Deno.test("OMDB Details Test", testOmdbDetails);
