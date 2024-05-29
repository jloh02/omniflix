"use server";

import { createClient } from "@/utils/supabase/server";
import { MOVIES_CACHE_TABLE, WATCHLIST_TABLE } from "../../constants";
import { Enums, Tables } from "@/utils/supabase/types.gen";
import { KanbanItem } from "@/components/kanban/kanbanTypes";

async function getWatchlist(
  mediaType: Enums<"media_type">,
  columnNames: string[],
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: watchlistData, error } = await supabase
    .from(WATCHLIST_TABLE)
    .select()
    .match({ user_id: user.id, media_type: mediaType })
    .returns<Tables<"watchlist_entries">[]>()
    .order("column_order");

  if (error || !watchlistData) {
    return;
  }

  const movieIds = watchlistData.map((item) => item.media_id);

  // Read from movie cache
  const { data: cacheData, error: cacheError } = await supabase
    .from(MOVIES_CACHE_TABLE)
    .select()
    .in("imdb_id", movieIds)
    .returns<Tables<"movies">[]>();

  // TODO handle cache missing in database (Should not happen for future cache development)
  if (cacheError || !cacheData) {
    return;
  }

  const data = cacheData.reduce((acc, item) => {
    acc.set(item.imdb_id, item);
    return acc;
  }, new Map<string, Tables<"movies">>());

  // Group by columnNames
  let result = columnNames.reduce((acc, colName) => {
    acc[colName] = [];
    return acc;
  }, {} as { [columnName: string]: KanbanItem[] });

  result = watchlistData.reduce((acc, item) => {
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
