"use server";

import { createClient } from "@/utils/supabase/server";
import {
  FunctionNames,
  MediaType,
  WatchlistFunctionAction,
} from "../../constants";

async function updateWatchlist(
  mediaType: MediaType,
  mediaId: number,
  statusColumn: number,
  columnOrderBefore?: string,
  columnOrderAfter?: string,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase.functions.invoke(
    FunctionNames.WATCHLIST,
    {
      body: {
        type: WatchlistFunctionAction.UPDATE,
        media_type: mediaType,
        media_id: mediaId,
        status_column: statusColumn,
        ...(columnOrderBefore
          ? { column_order_before: columnOrderBefore }
          : {}),
        ...(columnOrderAfter ? { column_order_after: columnOrderAfter } : {}),
      },
    },
  );

  if (error) {
    console.error(error);
    return;
  }

  const body = JSON.parse(data);
  if (body.success !== true || body.column_order === undefined) {
    return;
  }

  return body.column_order;
}

export default updateWatchlist;
