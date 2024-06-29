"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function followUser(
  targetUserId: string,
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

  // Add follow target user to database
  const { error } = await supabase
    .from(TableNames.USER_FOLLOWING)
    .insert({ following_id: targetUserId })
    .returns<TablesInsert<TableNames.USER_FOLLOWING>[]>();

  return error;
}

export default followUser;
