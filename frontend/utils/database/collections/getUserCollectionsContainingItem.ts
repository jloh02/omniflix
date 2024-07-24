"use server";

import { createClient } from "@/utils/supabase/server";
import { DatabaseViews, TableNames } from "../../constants";
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

  const { data, error } = await supabase
    .from(DatabaseViews.COLLECTION_COLLABORATORS_ITEMS)
    .select("collection_id")
    .eq("media_id", mediaId)
    .eq("user_id", targetUserId ?? user.id)
    .returns<Tables<DatabaseViews.COLLECTION_COLLABORATORS_ITEMS>[]>();

  if (error) {
    return { data: null, error };
  }

  // Get collection details
  const { data: collections, error: collectionsError } = await supabase
    .from(TableNames.COLLECTIONS)
    .select("*")
    .in("id", data?.map((collection) => collection.collection_id) ?? [])
    .returns<Tables<TableNames.COLLECTIONS>[]>();

  if (collectionsError) {
    return { data: null, error: collectionsError };
  }

  return { data: collections, error };
}

export default getUserCollectionsContainingItem;
