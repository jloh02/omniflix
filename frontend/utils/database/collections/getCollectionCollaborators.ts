"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function getCollectionCollaborators(collectionId: string): Promise<
  | {
      data: Tables<TableNames.USERS_INFO>[] | null;
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

  // Fetch user owned collections
  const { data, error } = await supabase
    .from(TableNames.COLLECTION_COLLABORATORS)
    .select(
      `
      ${TableNames.USERS_INFO} (
        *
      ),
    `,
    )
    .eq("collection_id", collectionId)
    .returns<Tables<TableNames.USERS_INFO>[]>();

  if (error) {
    return { data: null, error };
  }

  return { data, error };
}

export default getCollectionCollaborators;
