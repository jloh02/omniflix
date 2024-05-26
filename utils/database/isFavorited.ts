"use server";
import { createClient } from "@/utils/supabase/server";
import { FAVORITES_TABLE } from "../constants";

export default async function isFavorited(mediaType: string, mediaId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .select("*")
    .eq("media_type", mediaType)
    .eq("media_id", mediaId);

  if (error) {
    return;
  }

  return data && data.length > 0;
}
