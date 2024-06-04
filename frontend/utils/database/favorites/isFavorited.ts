"use server";
import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function isFavorited(mediaType: MediaType, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

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
