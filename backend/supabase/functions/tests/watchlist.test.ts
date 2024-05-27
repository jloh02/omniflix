import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { WatchlistAction } from "../utils/constants.ts";
import { Tables } from "../utils/types.gen.ts";
import { getLexorankDiff } from "../utils/lexorank.ts";

const NUMBER_OF_MOVIES = 3;
const NUMBER_OF_INSERT_UPDATES = 5;

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

async function testInsertWatchlist(
  client: SupabaseClient,
  action: WatchlistAction,
  media_id: string,
) {
  const { data: func_data, error: func_error } = await client.functions.invoke(
    "watchlist",
    {
      body: {
        type: action,
        media_type: "movie",
        media_id,
      },
    },
  );

  if (func_error) {
    throw new Error("Invalid response: " + func_error.message);
  }

  const funcBody = JSON.parse(func_data);

  assertEquals(funcBody.success, true);
  if (action === WatchlistAction.ADD) {
    assertExists(funcBody.column_order);
  }

  return funcBody.column_order;
}

async function getWatchlistEntryPairs(client: SupabaseClient) {
  return (await client.from("watchlist_entries")
    .select("*")
    .match({ media_type: "movie" })
    .order("column_order", { ascending: true })
    .returns<Tables<"watchlist_entries">[]>())
    .data
    ?.map((entry) => [entry.media_id, entry.column_order]);
}

async function testInsertionUpdates(
  entries: string[][],
  movie_ids: string[],
  client: SupabaseClient,
) {
  const fromIdx = Math.floor(Math.random() * movie_ids.length);
  const toIdx = Math.floor(Math.random() * movie_ids.length);

  const media_id = entries[fromIdx][0];

  entries.splice(toIdx, 0, entries.splice(fromIdx, 1)[0]);

  const column_order_before = toIdx > 0 ? entries[toIdx - 1][1] : null;
  const column_order_after = toIdx < entries.length - 1
    ? entries[toIdx + 1][1]
    : null;

  const { data, error } = await client.functions.invoke("watchlist", {
    body: {
      type: WatchlistAction.UPDATE,
      media_type: "movie",
      media_id,
      ...({ column_order_before } ?? {}),
      ...({ column_order_after } ?? {}),
    },
  });

  if (error) {
    console.error(await error.context.json());
    throw new Error(error.message);
  }

  const body = JSON.parse(data);

  assertExists(body);
  assertEquals(body.success, true);
  assertExists(body.column_order);

  entries[(toIdx < movie_ids.length) ? toIdx : (toIdx - 1)].splice(
    1,
    1,
    body.column_order,
  );

  // Ensure simulation matches
  const updatedState = await getWatchlistEntryPairs(client);
  assertEquals(updatedState, entries);

  // Ensure data integrity
  console.log(updatedState?.sort((a, b) => getLexorankDiff(a[1], b[1])));
}

const testWatchlist = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options,
  );

  const authRes = await client.auth.signInWithPassword({
    email: "user1@email.com",
    password: "test_password",
  });

  if (authRes.error) {
    throw authRes.error;
  }

  const movie_ids = Array.from(
    { length: NUMBER_OF_MOVIES },
    (_, index) => `tt${index.toString().padStart(7, "0")}`,
  );

  for (const movie_id in movie_ids) {
    console.log(movie_id);
    await testInsertWatchlist(client, WatchlistAction.ADD, movie_id);
  }

  const entries = await getWatchlistEntryPairs(client);

  if (!entries) {
    throw new Error("Failed to retrieve entries");
  }

  for (let i = 0; i < NUMBER_OF_INSERT_UPDATES; i++) {
    await testInsertionUpdates(entries, movie_ids, client);
  }

  for (const movie_id in movie_ids) {
    await testInsertWatchlist(client, WatchlistAction.REMOVE, movie_id);
  }
};

// Register and run the tests
Deno.test("Watchlist Insertion Function Test", testWatchlist);
