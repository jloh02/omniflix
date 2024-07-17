"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function removeCollectionCollaborator(
  collectionId: number,
  userId: string,
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

  // Remove collection collaborator
  const { error } = await supabase
    .from(TableNames.COLLECTION_COLLABORATORS)
    .delete()
    .eq("collection_id", collectionId)
    .eq("user_id", userId)
    .returns<TablesInsert<TableNames.COLLECTION_COLLABORATORS>[]>();

  return error;
}

export default removeCollectionCollaborator;
