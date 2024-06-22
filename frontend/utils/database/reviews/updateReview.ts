"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function updateReview(
  mediaType: MediaType,
  mediaId: string,
  rating: number,
  title: string,
  description: string,
): Promise<PostgrestError | null> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Update review
  const { error } = await supabase
    .from(TableNames.REVIEWS)
    .update({
      media_type: mediaType,
      media_id: mediaId,
      rating,
      title,
      description,
    })
    .eq("user_id", user.id)
    .returns<TablesInsert<TableNames.REVIEWS>[]>();

  return error;
}

export default updateReview;
