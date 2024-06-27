"use server";

import { createClient } from "@/utils/supabase/server";
import { LikeStatus, MediaType, TableNames } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";

async function getLikeStatus(
  mediaType: MediaType,
  mediaId: number,
): Promise<LikeStatus> {
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
    .select("status")
    .eq("user_id", user.id)
    .eq("media_id", mediaId)
    .limit(1)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  if (error) {
    console.error(error);
    throw new Error(
      "Error encountered when getting like status. Please try again later.",
    );
  }

  return data && data.length > 0 ? data[0].status : LikeStatus.NONE;
}

export default getLikeStatus;
