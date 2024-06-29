import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { TableNames, WatchlistAction } from "../_shared/constants.ts";
import { Tables } from "../_shared/types.gen.ts";
import fs from "node:fs";

const NUMBER_COLUMNS = 3;
const NUMBER_OF_MOVIES = 15;
const NUMBER_OF_INSERT_UPDATES = 100;

const INSERT_SPAM_NUM = 25;

const MOVIE_IDS = new Array(100).fill(0).map((_, i) => i + 1);
// const MOVIE_IDS: string[] = fs
//   .readFileSync("./supabase/movieIds.txt", "utf-8")
//   .split("\n");

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
  status_column: number,
  media_id: number
) {
  const { data: func_data, error: func_error } = await client.functions.invoke(
    "watchlist",
    {
      body: {
        type: action,
        media_type: "movie",
        media_id,
        status_column,
      },
    }
  );

  if (func_error) {
    console.error((await func_error.context.json()).error);
    throw new Error("Invalid response: " + func_error.message);
  }

  const funcBody = JSON.parse(func_data);

  assertEquals(funcBody.success, true);
  if (action === WatchlistAction.ADD) {
    assertExists(funcBody.column_order);
  }

  return funcBody.column_order;
}

async function getWatchlistEntries(
  client: SupabaseClient
): Promise<[number, string][][]> {
  return await Promise.all(
    Array.from<unknown, Promise<[number, string][]>>(
      { length: NUMBER_COLUMNS },
      async (_, status_column) => {
        return (
          (
            await client
              .from("watchlist_entries")
              .select(`*, ${TableNames.MEDIA}:media_id!inner(media_type)`)
              .match({ status_column })
              .eq(`${TableNames.MEDIA}.media_type`, "movie")
              .order("column_order", { ascending: true })
              .returns<Tables<"watchlist_entries">[]>()
          ).data?.map<[number, string]>((entry) => [
            entry.media_id,
            entry.column_order,
          ]) ?? []
        );
      }
    )
  );
}

async function testInsertionUpdates(
  client: SupabaseClient,
  entries: [number, string][][]
) {
  let fromCol;
  do {
    fromCol = Math.floor(Math.random() * entries.length);
  } while (entries[fromCol].length === 0);
  const toCol = Math.floor(Math.random() * entries.length);

  const fromIdx = Math.floor(Math.random() * entries[fromCol].length);
  const toIdx = Math.floor(Math.random() * entries[toCol].length);

  const debugMsg = `${fromCol},${fromIdx} to ${toCol},${toIdx}:\n${entries}`;

  const media_id = entries[fromCol][fromIdx][0];
  entries[toCol].splice(toIdx, 0, entries[fromCol].splice(fromIdx, 1)[0]);

  const column_order_before = toIdx > 0 ? entries[toCol][toIdx - 1][1] : null;
  const column_order_after =
    toIdx < entries[toCol].length - 1 ? entries[toCol][toIdx + 1][1] : null;

  const { data, error } = await client.functions.invoke("watchlist", {
    body: {
      type: WatchlistAction.UPDATE,
      media_type: "movie",
      media_id,
      status_column: toCol,
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

  entries[toCol][toIdx < entries[toCol].length ? toIdx : toIdx - 1].splice(
    1,
    1,
    body.column_order
  );

  // Ensure simulation matches
  const updatedState = await getWatchlistEntries(client);
  assertEquals(updatedState, entries, debugMsg);

  // Ensure data integrity
  assertEquals(
    updatedState,
    updatedState.map((col) => col?.sort((a, b) => b[1].localeCompare(a[1])))
  );
}

async function removeAllEntries(client: SupabaseClient) {
  const finalEntries = await getWatchlistEntries(client);
  await Promise.all(
    finalEntries.flatMap((col, status_column) => {
      return col.map(async (entry) => {
        await testInsertWatchlist(
          client,
          WatchlistAction.REMOVE,
          status_column,
          entry[0]
        );
      });
    })
  );
}

const testWatchlist = async () => {
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

  const movieIds = MOVIE_IDS.slice(0, NUMBER_OF_MOVIES);
  for (const [idx, movie_id] of movieIds.entries()) {
    await testInsertWatchlist(
      client,
      WatchlistAction.ADD,
      idx % NUMBER_COLUMNS,
      movie_id
    );
  }

  const entries = await getWatchlistEntries(client);

  if (!entries) {
    throw new Error("Failed to retrieve entries");
  }

  for (let i = 0; i < NUMBER_OF_INSERT_UPDATES; i++) {
    await testInsertionUpdates(client, entries);
  }

  await removeAllEntries(client);
};

const testWatchlistInserts = async () => {
  const client: SupabaseClient = createClient(
    supabaseUrl,
    supabaseKey,
    options
  );

  const authRes = await client.auth.signInWithPassword({
    email: "user2@email.com",
    password: "test_password",
  });

  if (authRes.error) {
    throw authRes.error;
  }

  const movieIds = MOVIE_IDS.slice(0, INSERT_SPAM_NUM);

  for (const movie_id of movieIds) {
    await testInsertWatchlist(client, WatchlistAction.ADD, 0, movie_id);
  }
  const entries = await getWatchlistEntries(client);
  assertEquals(
    entries[0].map(([id, _]) => id),
    movieIds
  );

  let column_order_after = null;
  for (const movie_id of movieIds) {
    const { data, error } = await client.functions.invoke("watchlist", {
      body: {
        type: WatchlistAction.UPDATE,
        media_type: "movie",
        media_id: movie_id,
        status_column: 1,
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

    column_order_after = body.column_order;
  }
  const entries2 = await getWatchlistEntries(client);
  assertEquals(
    entries2[1].map(([id, _]) => id),
    movieIds.toReversed()
  );

  await removeAllEntries(client);
};

Deno.test("Watchlist Function Test", testWatchlist);
Deno.test("Watchlist Insert Spam Last then First", testWatchlistInserts);
