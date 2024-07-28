"use server";

import { createClient } from "@/utils/supabase/server";
import {
  FriendRequestDirection,
  getFriendRequestDirectionBoolean,
  TableNames,
} from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function rejectFriendRequest(
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

  // Remove friend request from database
  if (user.id < targetUserId) {
    const { error } = await supabase
      .from(TableNames.FRIEND_REQUESTS)
      .delete()
      .eq("user_id1", user.id)
      .eq("user_id2", targetUserId)
      .returns<TablesInsert<TableNames.FRIEND_REQUESTS>[]>();

    return error;
  } else {
    const { error } = await supabase
      .from(TableNames.FRIEND_REQUESTS)
      .delete()
      .eq("user_id1", targetUserId)
      .eq("user_id2", user.id)
      .returns<TablesInsert<TableNames.FRIEND_REQUESTS>[]>();

    return error;
  }
}

export default rejectFriendRequest;
