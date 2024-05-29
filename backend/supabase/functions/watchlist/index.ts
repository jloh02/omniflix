import {
  createClient,
  SupabaseClient,
} from "https://esm.sh/@supabase/supabase-js@2.23.0";
import { WatchlistAction } from "../_shared/constants.ts";
import {
  extendLexorank,
  genFirstLexoRank,
  genLastLexoRank,
  getLexorank,
  getLexorankDiff,
} from "../_shared/lexorank.ts";
import { Tables, TablesInsert, TablesUpdate } from "../_shared/types.gen.ts";

async function getLastColumnOrder(
  client: SupabaseClient,
  user_id: string,
  media_type: string,
  status_column?: number,
) {
  const { data } = await client.from("watchlist_entries")
    .select("column_order")
    .match({ user_id, media_type, status_column: status_column ?? 0 })
    .order("column_order", { ascending: false })
    .limit(1)
    .returns<Tables<"watchlist_entries">[]>()
    .single();

  const columnOrder = data ? (data.column_order) : genFirstLexoRank();
  return getLexorank(columnOrder, genLastLexoRank(columnOrder.length));
}

Deno.serve(async (req: Request) => {
  const supabaseClient: SupabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: { headers: { Authorization: req.headers.get("Authorization")! } },
    },
  );

  const authHeader = req.headers.get("Authorization")!;
  const token = authHeader.replace("Bearer ", "");
  const user = await supabaseClient.auth.getUser(token);

  if (!user || !user.data.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user_id = user.data.user.id;
  const body = await req.json();

  const { media_type, media_id, status_column } = body;

  if (!media_type || !media_id) {
    return new Response(
      JSON.stringify({
        error: "Missing required fields: media_type, media_id",
      }),
      { status: 400 },
    );
  }

  if (body.type === WatchlistAction.ADD) {
    const column_order = await getLastColumnOrder(
      supabaseClient,
      user_id,
      media_type,
      status_column,
    );
    const { error } = await supabaseClient.from("watchlist_entries")
      .insert({
        user_id,
        media_type,
        media_id,
        column_order,
        status_column: status_column ?? 0,
      })
      .returns<TablesInsert<"watchlist_entries">>();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true, column_order }), {
      status: 200,
    });
  }

  if (body.type === WatchlistAction.REMOVE) {
    const { error } = await supabaseClient.from("watchlist_entries")
      .delete()
      .match({ user_id, media_type, media_id })
      .returns<TablesUpdate<"watchlist_entries">>();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  if (body.type === WatchlistAction.UPDATE) {
    let { column_order_before, column_order_after } = body;
    let nullAfter = false;

    if (!column_order_before) {
      column_order_before = genFirstLexoRank(column_order_after?.length);
    }

    if (!column_order_after) {
      nullAfter = true;
      column_order_after = genLastLexoRank(column_order_before?.length);
    }

    if (column_order_before > column_order_after) {
      return new Response(
        JSON.stringify({
          error: "column_order_before must be less than column_order_after",
        }),
        { status: 400 },
      );
    }

    const diff = getLexorankDiff(column_order_before, column_order_after);
    if (diff === 0) {
      const oldColumnOrder = nullAfter
        ? column_order_before
        : column_order_after;
      const newColumnOrder = extendLexorank(oldColumnOrder, nullAfter);
      if (nullAfter) {
        column_order_before = newColumnOrder;
      } else {
        column_order_after = newColumnOrder;
      }

      const { error: updateOldError } = await supabaseClient.from(
        "watchlist_entries",
      )
        .update({
          status_column,
          column_order: newColumnOrder,
        })
        .match({
          user_id,
          media_type,
          column_order: oldColumnOrder,
        })
        .returns<TablesUpdate<"watchlist_entries">>();

      if (updateOldError) {
        return new Response(JSON.stringify({ error: updateOldError.message }), {
          status: 400,
        });
      }

      const column_order = getLexorank(column_order_before, column_order_after);
      const { error: insertError } = await supabaseClient.from(
        "watchlist_entries",
      )
        .update({ status_column, column_order })
        .match({ user_id, media_type, media_id })
        .returns<TablesUpdate<"watchlist_entries">>();
      if (insertError) {
        return new Response(JSON.stringify({ error: insertError.message }), {
          status: 400,
        });
      }

      return new Response(JSON.stringify({ success: true, column_order }), {
        status: 200,
      });
    } else {
      const column_order = getLexorank(
        column_order_before,
        column_order_after,
        diff,
      );
      const { error } = await supabaseClient.from("watchlist_entries")
        .update({ status_column, column_order })
        .match({ user_id, media_type, media_id })
        .returns<TablesUpdate<"watchlist_entries">>();

      if (error) {
        return new Response(JSON.stringify({ error }), {
          status: 400,
        });
      }

      return new Response(JSON.stringify({ success: true, column_order }), {
        status: 200,
      });
    }
  }

  return new Response(JSON.stringify({ error: "Invalid type" }), {
    status: 400,
  });
});
