"use server";

import { createClient } from "@/utils/supabase/server";
import { DatabaseViews, TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function isInUserCollectionsBatch(mediaIds: number[]) {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  const { data, error } = await supabase
    .from(DatabaseViews.COLLECTION_COLLABORATORS_ITEMS)
    .select("media_id")
    .eq("user_id", user.id)
    .in("media_id", mediaIds)
    .returns<Tables<DatabaseViews.COLLECTION_COLLABORATORS_ITEMS>[]>();

  if (error) return [];
  return data
    .map((row) => row.media_id)
    .filter((mediaId): mediaId is number => mediaId !== null);
}

export default isInUserCollectionsBatch;
