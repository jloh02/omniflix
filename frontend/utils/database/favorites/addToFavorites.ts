"use server";
import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function addToFavorites(mediaType: MediaType, mediaId: number) {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, return
  if (!user) {
    return;
  }

  // Insert into favorites table
  const { error } = await supabase
    .from(TableNames.FAVORITES)
    .insert({ user_id: user.id, media_id: mediaId })
    .returns<Tables<TableNames.FAVORITES>[]>();

  return !error;
}

export default addToFavorites;
