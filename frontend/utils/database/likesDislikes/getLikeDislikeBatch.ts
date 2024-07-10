"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "@/utils/constants";

async function getLikeDislikeBatch(mediaIds: number[]) {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Fetch like status
  const { data, error } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("status, media_id")
    .eq("user_id", user.id)
    .in("media_id", mediaIds);

  if (error) return [];
  return data.reduce(
    (prev, row) => ({ ...prev, [row.media_id]: row.status }),
    {},
  );
}

export default getLikeDislikeBatch;
