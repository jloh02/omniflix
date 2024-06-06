"use server";
import { createClient } from "@/utils/supabase/server";
import { LikeStatus, MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function addToLikeDislike(
  mediaType: MediaType,
  mediaId: string,
  likeStatus: LikeStatus,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login again.");
  }

  const { data: existingEntry } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("*")
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  let error;
  if (existingEntry && existingEntry.length > 0) {
    const { error } = await supabase
      .from(TableNames.LIKES_DISLIKES)
      .update({
        status: likeStatus,
      })
      .eq("user_id", user.id)
      .eq("media_type", mediaType)
      .eq("media_id", mediaId)
      .returns<Tables<TableNames.LIKES_DISLIKES>[]>();
  } else {
    const { error } = await supabase
      .from(TableNames.LIKES_DISLIKES)
      .insert({
        user_id: user.id,
        media_type: mediaType,
        media_id: mediaId,
        status: likeStatus,
      })
      .returns<Tables<TableNames.LIKES_DISLIKES>[]>();
  }

  return !error;
}

export default addToLikeDislike;
