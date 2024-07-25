"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function addCollectionCollaborator(
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

  // Add collection collaborator
  const { error } = await supabase
    .from(TableNames.COLLECTION_COLLABORATORS)
    .insert({ collection_id: collectionId, user_id: userId })
    .returns<TablesInsert<TableNames.COLLECTION_COLLABORATORS>[]>();

  return error;
}

export default addCollectionCollaborator;
