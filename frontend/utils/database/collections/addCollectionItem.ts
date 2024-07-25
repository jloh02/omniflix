"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function addCollectionItem(
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

  // Add item to collection
  const { error } = await supabase
    .from(TableNames.COLLECTION_ENTRIES)
    .insert({ collection_id: collectionId, media_id: mediaId })
    .returns<TablesInsert<TableNames.COLLECTION_ENTRIES>[]>();

  return error;
}

export default addCollectionItem;
