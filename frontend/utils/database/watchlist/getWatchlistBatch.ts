"use server";

import { TableNames } from "../../constants";
import { createClient } from "@/utils/supabase/server";

async function getWatchlistBatch(mediaIds: number[]) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login again.");
  }

  const { data, error } = await supabase
    .from(TableNames.WATCHLIST)
    .select("*")
    .eq("user_id", user.id)
    .in("media_id", mediaIds);

  if (error) return [];
  return data.map((row) => row.media_id);
}

export default getWatchlistBatch;
