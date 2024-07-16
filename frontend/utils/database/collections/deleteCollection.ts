"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";

async function deleteCollection(
  collectionId: number,
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
    .from(TableNames.COLLECTIONS)
    .delete()
    .eq("id", collectionId);

  return error;
}

export default deleteCollection;
