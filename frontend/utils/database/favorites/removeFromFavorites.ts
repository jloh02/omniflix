"use server";
import { createClient } from "@/utils/supabase/server";
import { FAVORITES_TABLE, MediaType } from "../../constants";

async function removeFromFavorites(mediaType: MediaType, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from(FAVORITES_TABLE)
    .delete()
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId);

  return !error;
}

export default removeFromFavorites;
