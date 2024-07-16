"use server";

import { createClient } from "@/utils/supabase/server";
import { MediaType, TableNames } from "../../constants";
import { Tables, TablesInsert, TablesUpdate } from "@/utils/supabase/types.gen";
import IReview from "@/utils/types/IReview";
import { PostgrestError } from "@supabase/supabase-js";

export interface ReviewWithUserInfo extends TablesInsert<TableNames.REVIEWS> {
  users_info: { username: string };
}

async function getUserCollections(targetUserId?: string): Promise<
  | {
      data: Tables<TableNames.COLLECTIONS>[] | null;
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
      ${TableNames.COLLECTIONS} (
        *
      ),
    `,
    )
    .eq("user_id", user.id)
    .returns<Tables<TableNames.COLLECTIONS>[]>();

  if (error) {
    return { data: null, error };
  }

  return { data, error };
}

export default getUserCollections;
