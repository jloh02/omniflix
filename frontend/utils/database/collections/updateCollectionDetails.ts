"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function updateCollectionDetails(
  collectionId: number,
  name: string,
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

  // Update collection
  const { error } = await supabase
    .from(TableNames.COLLECTIONS)
    .update({ name })
    .eq("id", collectionId)
    .returns<TablesInsert<TableNames.COLLECTIONS>[]>();

  return error;
}

export default updateCollectionDetails;
