"use server";
import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function removeFromLikeDislike(mediaType: MediaType, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login again.");
  }

  const { error } = await supabase
    .from(TableNames.LIKES_DISLIKES)
    .delete()
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  if (error) {
    throw new Error(
      "Error encountered when removing like status. Please try again later.",
    );
  }

  return !error;
}

export default removeFromLikeDislike;
