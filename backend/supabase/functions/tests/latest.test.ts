import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
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

const testLatest = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options
  );

  const authRes = await client.auth.signInWithPassword({
    email: "user1@email.com",
    password: "test_password",
  });

  if (authRes.error) {
    throw authRes.error;
  }

  const res = await client.functions.invoke("latest", {
    body: { type: "movie" },
  });

  assertEquals(JSON.parse(res.data).success, true);
};

Deno.test("Latest Function Test", testLatest);
