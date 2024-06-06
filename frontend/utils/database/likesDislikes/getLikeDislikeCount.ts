"use server";

import { createClient } from "@/utils/supabase/server";
import { LikeStatus, MediaType, TableNames } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";

async function getLikeDislikeCount(
  mediaType: MediaType,
  mediaId: string,
): Promise<{ likeCount: number; dislikeCount: number }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login again.");
  }

  const { count: likeCount, error: likeError } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .eq("status", LikeStatus.LIKE)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  if (likeError) {
    throw new Error(
      "Error encountered when getting like count. Please try again later.",
    );
  }

  const { count: dislikeCount, error: dislikeError } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .eq("status", LikeStatus.DISLIKE)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  if (dislikeError) {
    throw new Error(
      "Error encountered when getting dislike count. Please try again later.",
    );
  }

  return { likeCount: likeCount || 0, dislikeCount: dislikeCount || 0 };
}

export default getLikeDislikeCount;
