"use server";

import { createClient } from "@/utils/supabase/server";
import {
  FriendRequestDirection,
  getFriendRequestDirectionBoolean,
  TableNames,
} from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "@/utils/supabase/types.gen";

async function getUserFriendRequests(targetUserId?: string): Promise<
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

  // If no target user is provided, use the current user
  targetUserId = targetUserId ?? user.id;

  // Get friend request user ids from database
  const { data: friendRequestData1, error: friendRequestError1 } =
    await supabase
      .from(TableNames.FRIEND_REQUESTS)
      .select("user_id1")
      .eq("user_id2", targetUserId ?? user.id)
      .eq(
        "request_direction",
        getFriendRequestDirectionBoolean(FriendRequestDirection.FROM_USER1),
      )
      .returns<Tables<TableNames.FRIEND_REQUESTS>[]>();

  if (friendRequestError1) {
    return { data: null, error: friendRequestError1 };
  }

  const { data: friendRequestData2, error: friendRequestError2 } =
    await supabase
      .from(TableNames.FRIEND_REQUESTS)
      .select("user_id2")
      .eq("user_id1", targetUserId ?? user.id)
      .eq(
        "request_direction",
        getFriendRequestDirectionBoolean(FriendRequestDirection.FROM_USER2),
      )
      .returns<Tables<TableNames.FRIEND_REQUESTS>[]>();

  if (friendRequestError2) {
    return { data: null, error: friendRequestError2 };
  }

  // Append both arrays together
  const friendRequestData = friendRequestData1.concat(friendRequestData2);

  // Get friend requests users info from database
  const friendRequestUserData = await Promise.all(
    friendRequestData.map(async (friendRequest) => {
      const { data, error } = await supabase
        .from(TableNames.USERS_INFO)
        .select("*")
        .eq(
          "user_id",
          friendRequest.user_id1 == undefined
            ? friendRequest.user_id2
            : friendRequest.user_id1,
        )
        .limit(1)
        .returns<Tables<TableNames.USERS_INFO>[]>()
        .single();

      if (!data) {
        throw new Error(error.message);
      }

      return data;
    }),
  );

  return { data: friendRequestUserData, error: null };
}

export default getUserFriendRequests;
