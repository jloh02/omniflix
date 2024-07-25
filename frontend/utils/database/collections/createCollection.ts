"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function createCollection(name: string): Promise<PostgrestError | null> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Create new collection
  const { data: collectionData, error: collectionError } = await supabase
    .from(TableNames.COLLECTIONS)
    .insert({ name })
    .select()
    .returns<TablesInsert<TableNames.COLLECTIONS>[]>();

  if (collectionError) {
    return collectionError;
  }

  // Add collection collaborator
  const { error: collaboratorError } = await supabase
    .from(TableNames.COLLECTION_COLLABORATORS)
    .insert({ collection_id: collectionData[0].id, user_id: user.id })
    .returns<TablesInsert<TableNames.COLLECTION_COLLABORATORS>[]>();

  return collaboratorError;
}

export default createCollection;
