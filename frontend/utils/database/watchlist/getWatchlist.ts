"use server";

import { createClient } from "@/utils/supabase/server";
import {
  COMPLETED_STATUS_COLUMN_INDEX,
  MediaType,
  TableNames,
} from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";
import { KanbanItem } from "@/components/kanban/kanbanTypes";

async function getWatchlist(mediaType: MediaType, columnNames: string[]) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: watchlistData, error } = await supabase
    .from(TableNames.WATCHLIST)
    .select(
      `*, 
      ${TableNames.MEDIA}:media_id!inner (
        media_type
      )`,
    )
    .eq("user_id", user.id)
    .eq(`${TableNames.MEDIA}.media_type`, mediaType)
    .returns<Tables<TableNames.WATCHLIST>[]>()
    .order("column_order");

  if (error || !watchlistData) {
    return;
  }

  const movieIds = watchlistData.map((item) => item.media_id);

  // Read from movie cache
  const { data: cacheData, error: cacheError } = await supabase
    .from(TableNames.MOVIES_CACHE)
    .select(
      `*, 
      ${TableNames.MEDIA}!inner (
        media_id
      )`,
    )
    .in(`${TableNames.MEDIA}.media_id`, movieIds);

  if (cacheError || !cacheData) {
    throw new Error("Cache should always contain updated data. None found");
  }

  const data = cacheData.reduce((acc, item) => {
    acc.set(item.media.media_id, item);
    return acc;
  }, new Map<number, Tables<TableNames.MOVIES_CACHE>>());

  // Group by columnNames
  let result = columnNames.reduce(
    (acc, colName) => {
      acc[colName] = [];
      return acc;
    },
    {} as { [columnName: string]: KanbanItem[] },
  );

  result = watchlistData.reduce((acc, item) => {
    if (item.status_column === COMPLETED_STATUS_COLUMN_INDEX)
      item.status_column = columnNames.length - 1;
    if (item.status_column > columnNames.length) {
      throw new Error("Invalid status column returned by database");
    }
    const itemData = data.get(item.media_id);
    acc[columnNames[item.status_column]].push({
      id: item.media_id,
      columnOrder: item.column_order,
      title: itemData?.title ?? "",
      year: itemData?.year ?? "",
      image: itemData?.poster_url ?? "",
    });
    return acc;
  }, result);

  return result;
}

export default getWatchlist;
