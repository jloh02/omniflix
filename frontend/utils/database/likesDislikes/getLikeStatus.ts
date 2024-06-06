"use server";

import { createClient } from "@/utils/supabase/server";
import { LikeStatus, MediaType, TableNames } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";

async function getLikeStatus(
  mediaType: MediaType,
  mediaId: string,
): Promise<LikeStatus> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login again.");
  }

  const { data, error } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("status")
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .limit(1)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  if (error) {
    throw new Error(
      "Error encountered when getting like status. Please try again later.",
    );
  }

  return data && data.length > 0 ? data[0].status : LikeStatus.NONE;
}

export default getLikeStatus;
