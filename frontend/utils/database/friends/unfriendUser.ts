"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { TablesUpdate } from "@/utils/supabase/types.gen";

async function unfriendUser(
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

  // Remove friendship from database
  const { error: error1 } = await supabase
    .from(TableNames.FRIENDSHIPS)
    .delete()
    .eq("user_id1", user.id)
    .eq("user_id2", targetUserId)
    .returns<TablesUpdate<TableNames.USER_FOLLOWING>[]>();

  if (error1) {
    return error1;
  }

  const { error: error2 } = await supabase
    .from(TableNames.FRIENDSHIPS)
    .delete()
    .eq("user_id1", targetUserId)
    .eq("user_id2", user.id)
    .returns<TablesUpdate<TableNames.USER_FOLLOWING>[]>();

  return error2;
}

export default unfriendUser;
