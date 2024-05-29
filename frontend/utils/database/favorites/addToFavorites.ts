"use server";
import { createClient } from "@/utils/supabase/server";
import { FAVORITES_TABLE, MediaType } from "../../constants";

async function addToFavorites(mediaType: MediaType, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from(FAVORITES_TABLE)
    .insert({ user_id: user.id, media_type: mediaType, media_id: mediaId });

  if (error) {
    return;
  }
  return;
}

export default addToFavorites;
