"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function getUserCollectionsContainingItem(
  mediaId: number,
  targetUserId?: string,
): Promise<
  | {
      data: Tables<TableNames.COLLECTIONS>[] | null;
      error: PostgrestError | null;
    }
  | undefined
> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Fetch user collections
  const { data, error } = await supabase
    .from(TableNames.COLLECTION_COLLABORATORS)
    .select("collection_id")
    .eq("user_id", targetUserId ?? user.id)
    .returns<Tables<TableNames.COLLECTION_COLLABORATORS>[]>();

  if (error) {
    return { data: null, error };
  }

  // Filter user collections containing media id
  const { data: filteredData, error: filteredError } = await supabase
    .from(TableNames.COLLECTION_ENTRIES)
    .select("collection_id")
    .eq("media_id", mediaId)
    .in(
      "collection_id",
      data?.map((collection) => collection.collection_id) ?? [],
    )
    .returns<Tables<TableNames.COLLECTION_ENTRIES>[]>();

  if (filteredError) {
    return { data: null, error: filteredError };
  }

  // Get collection details
  const { data: collections, error: collectionsError } = await supabase
    .from(TableNames.COLLECTIONS)
    .select("*")
    .in("id", filteredData?.map((collection) => collection.collection_id) ?? [])
    .returns<Tables<TableNames.COLLECTIONS>[]>();

  if (collectionsError) {
    return { data: null, error: collectionsError };
  }

  return { data: collections, error };
}

export default getUserCollectionsContainingItem;
