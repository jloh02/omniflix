"use server";
import { createClient } from "@/utils/supabase/server";

export default async function removeFromFavorites(
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
    .delete()
    .eq("media_type", mediaType)
    .eq("media_id", mediaId);

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
  return data;
}
