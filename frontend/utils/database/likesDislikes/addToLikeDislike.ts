"use server";
import { createClient } from "@/utils/supabase/server";
import { LikeStatus, MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function addToLikeDislike(
  mediaType: MediaType,
  mediaId: number,
  likeStatus: LikeStatus,
) {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Check if the media item is already liked/disliked by the user
  const { data: existingEntry } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .select("*")
    .eq("user_id", user.id)
    .eq("media_id", mediaId)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  let error;
  if (existingEntry && existingEntry.length > 0) {
    // If the media item is already liked/disliked, update the like status
    const { error } = await supabase
      .from(TableNames.LIKES_DISLIKES)
      .update({
        status: likeStatus,
      })
      .eq("user_id", user.id)
      .eq("media_id", mediaId)
      .returns<Tables<TableNames.LIKES_DISLIKES>[]>();
  } else {
    // If the media item is not liked/disliked, add a new entry
    const { error } = await supabase
      .from(TableNames.LIKES_DISLIKES)
      .insert({
        user_id: user.id,
        media_id: mediaId,
        status: likeStatus,
      })
      .returns<Tables<TableNames.LIKES_DISLIKES>[]>();
  }

  return !error;
}

export default addToLikeDislike;
