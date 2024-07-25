"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";
import { supabaseFixOneToOne } from "@/utils/supabaseFixOneToOne";

async function getCollectionCollaborators(collectionId: number): Promise<
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
    .select(`${TableNames.USERS_INFO}(*)`)
    .eq("collection_id", collectionId);

  if (error) {
    return { data: null, error };
  }

  const collaboratorsData = data.map(
    (user) =>
      supabaseFixOneToOne(user.users_info) as Tables<TableNames.USERS_INFO>,
  );

  return { data: collaboratorsData, error };
}

export default getCollectionCollaborators;
