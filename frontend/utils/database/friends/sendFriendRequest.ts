"use server";

import { createClient } from "@/utils/supabase/server";
import {
  FriendRequestDirection,
  getFriendRequestDirectionBoolean,
  TableNames,
} from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function sendFriendRequest(
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

  // Add friend request to database
  if (user.id < targetUserId) {
    const { error } = await supabase
      .from(TableNames.FRIEND_REQUESTS)
      .insert({
        user_id1: user.id,
        user_id2: targetUserId,
        request_direction: getFriendRequestDirectionBoolean(
          FriendRequestDirection.FROM_USER1,
        ),
      })
      .returns<TablesInsert<TableNames.FRIEND_REQUESTS>[]>();

    return error;
  } else {
    const { error } = await supabase
      .from(TableNames.FRIEND_REQUESTS)
      .insert({
        user_id1: targetUserId,
        user_id2: user.id,
        request_direction: getFriendRequestDirectionBoolean(
          FriendRequestDirection.FROM_USER2,
        ),
      })
      .returns<TablesInsert<TableNames.FRIEND_REQUESTS>[]>();

    return error;
  }
}

export default sendFriendRequest;
