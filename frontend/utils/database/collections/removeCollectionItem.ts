"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function removeCollectionItem(
  collectionId: number,
  mediaId: number,
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

  // Remove item from collection
  const { error } = await supabase
    .from(TableNames.COLLECTION_ENTRIES)
    .delete()
    .eq("collection_id", collectionId)
    .eq("media_id", mediaId)
    .returns<TablesInsert<TableNames.COLLECTION_ENTRIES>[]>();

  return error;
}

export default removeCollectionItem;
