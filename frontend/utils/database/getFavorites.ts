"use server";
import { createClient } from "@/utils/supabase/server";
import { FAVORITES_TABLE } from "../constants";

async function getFavorites(mediaType: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .select("media_id")
    .eq("user_id", user.id)
    .eq("media_type", mediaType);

  if (error) {
    return;
  }

  return data ? data.map((item: any) => item.media_id) : [];
}

export default getFavorites;
