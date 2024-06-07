"use server";
import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function removeFromFavorites(mediaType: MediaType, mediaId: string) {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, return
  if (!user) {
    return;
  }

  // Remove the media item from the user's favorites
  const { error } = await supabase
    .from(TableNames.FAVORITES)
    .delete()
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .returns<Tables<TableNames.FAVORITES>[]>();

  return !error;
}

export default removeFromFavorites;
