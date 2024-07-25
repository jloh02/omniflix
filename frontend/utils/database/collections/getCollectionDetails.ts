"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function getCollectionDetails(collectionId: string): Promise<
  | {
      data: Tables<TableNames.COLLECTIONS> | null;
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

  // Get collection details
  const { data, error } = await supabase
    .from(TableNames.COLLECTIONS)
    .select("*")
    .eq("id", collectionId)
    .returns<Tables<TableNames.COLLECTIONS>>()
    .single();

  if (error) {
    return { data: null, error };
  }

  return { data, error };
}

export default getCollectionDetails;
