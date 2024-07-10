"use server";

import { TableNames } from "../../constants";
import { createClient } from "@/utils/supabase/server";

async function getFavoritesBatch(mediaIds: number[]) {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, return
  if (!user) {
    throw new Error("Please login again.");
  }

  // Check if the media item is favorited by the user
  const { data, error } = await supabase
    .from(TableNames.FAVORITES)
    .select("media_id")
    .eq("user_id", user.id)
    .in("media_id", mediaIds);

  if (error) return [];
  return data.map((row) => row.media_id);
}

export default getFavoritesBatch;
