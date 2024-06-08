"use server";
import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function isFavorited(mediaType: MediaType, mediaId: string) {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, return
  if (!user) {
    return;
  }

  // Check if the media item is favorited by the user
  const { data, error } = await supabase
    .from(TableNames.FAVORITES)
    .select("*")
    .eq("user_id", user.id)
    .eq("media_type", mediaType)
    .eq("media_id", mediaId)
    .limit(1)
    .returns<Tables<TableNames.FAVORITES>[]>();

  if (error) {
    return;
  }

  return data && data.length > 0;
}

export default isFavorited;
