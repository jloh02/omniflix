"use server";
import { createClient } from "@/utils/supabase/server";
import { FAVORITES_TABLE } from "../constants";

async function addToFavorites(mediaType: string, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .insert({ media_type: mediaType, media_id: mediaId })
    .select();

  if (error) {
    return;
  }

  return Boolean(data);
}

export default addToFavorites;
