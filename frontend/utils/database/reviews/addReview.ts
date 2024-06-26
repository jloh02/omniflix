"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function addReview(
  mediaType: MediaType,
  mediaId: number,
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

  // Add review
  const { error } = await supabase
    .from(TableNames.REVIEWS)
    .insert({
      media_id: mediaId,
      rating,
      title,
      description,
    })
    .returns<TablesInsert<TableNames.REVIEWS>[]>();

  return error;
}

export default addReview;
