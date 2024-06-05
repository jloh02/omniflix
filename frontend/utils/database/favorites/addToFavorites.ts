"use server";
import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function addToFavorites(mediaType: MediaType, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase
    .from(TableNames.FAVORITES)
    .insert({ user_id: user.id, media_type: mediaType, media_id: mediaId })
    .returns<Tables<TableNames.FAVORITES>[]>();

  return !error;
}

export default addToFavorites;
