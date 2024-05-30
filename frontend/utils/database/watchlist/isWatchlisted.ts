"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, WATCHLIST_TABLE } from "../../constants";

async function isWatchlisted(mediaType: MediaType, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from(WATCHLIST_TABLE)
    .select("*")
    .match({ media_type: mediaType, media_id: mediaId, user_id: user.id })
    .limit(1);

  if (error) {
    return;
  }

  return data && data.length > 0;
}

export default isWatchlisted;
