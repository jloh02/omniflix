"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { TablesUpdate } from "@/utils/supabase/types.gen";

async function unfollowUser(
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

  // Remove follow target user from database
  const { error } = await supabase
    .from(TableNames.USER_FOLLOWING)
    .delete()
    .eq("user_id", user.id)
    .eq("following_id", targetUserId)
    .returns<TablesUpdate<TableNames.USER_FOLLOWING>[]>();

  return error;
}

export default unfollowUser;
