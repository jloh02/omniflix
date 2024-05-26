"use server";
import { createClient } from "@/utils/supabase/server";

export default async function addToFavorites(
  mediaType: string,
  mediaId: string,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data, error } = await supabase
    .from("favorites_entries")
    .insert({ media_type: mediaType, media_id: mediaId })
    .select();

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
  return data;
}
