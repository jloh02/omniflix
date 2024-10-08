"use server";

import { createClient } from "@/utils/supabase/server";
import { LikeStatus, MediaType, TableNames } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";

async function getLikeDislikeCount(
  mediaType: MediaType,
  mediaId: number,
): Promise<{ likeCount: number; dislikeCount: number }> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Fetch like count
  const { count: likeCount, error: likeError } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("*", { count: "exact", head: true })
    .eq("media_id", mediaId)
    .eq("status", LikeStatus.LIKE)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  if (likeError) {
    console.error(likeError);
    throw new Error(
      "Error encountered when getting like count. Please try again later.",
    );
  }

  // Fetch dislike count
  const { count: dislikeCount, error: dislikeError } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("*", { count: "exact", head: true })
    .eq("media_id", mediaId)
    .eq("status", LikeStatus.DISLIKE)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  if (dislikeError) {
    console.error(dislikeError);
    throw new Error(
      "Error encountered when getting dislike count. Please try again later.",
    );
  }

  return { likeCount: likeCount || 0, dislikeCount: dislikeCount || 0 };
}

export default getLikeDislikeCount;
