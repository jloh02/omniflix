"use server";

import { createClient } from "@/utils/supabase/server";
import {
  FriendRequestDirection,
  FriendshipStatus,
  getFriendRequestDirectionFromBoolean,
  TableNames,
} from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "@/utils/supabase/types.gen";

async function getFriendshipStatus(targetUserId: string): Promise<
  | {
      data: FriendshipStatus | null;
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

  // Check if users are friends
  const { data: friendshipData, error: friendshipError } = await supabase
    .from(TableNames.FRIENDSHIPS)
    .select("*")
    .eq("user_id1", user.id)
    .eq("user_id2", targetUserId)
    .returns<Tables<TableNames.FRIENDSHIPS>[]>()
    .single();

  if (friendshipError && friendshipError.code !== "PGRST116") {
    return { data: null, error: friendshipError };
  }

  if (friendshipData) {
    return { data: FriendshipStatus.FRIENDS, error: friendshipError };
  }

  // Check if a friend request has been sent
  const isUser1 = user.id < targetUserId;
  const userId1 = isUser1 ? user.id : targetUserId;
  const userId2 = isUser1 ? targetUserId : user.id;

  const { data: friendRequestData, error: friendRequestError } = await supabase
    .from(TableNames.FRIEND_REQUESTS)
    .select("request_direction")
    .eq("user_id1", userId1)
    .eq("user_id2", userId2)
    .returns<Tables<TableNames.FRIEND_REQUESTS>[]>()
    .single();

  if (friendRequestError && friendRequestError.code !== "PGRST116") {
    return { data: null, error: friendRequestError };
  }

  if (friendRequestData) {
    const requestDirection = getFriendRequestDirectionFromBoolean(
      friendRequestData.request_direction,
    );

    if (requestDirection === FriendRequestDirection.FROM_USER1) {
      const friendshipStatus = isUser1
        ? FriendshipStatus.PENDING_THEM
        : FriendshipStatus.PENDING_ME;
      return { data: friendshipStatus, error: friendRequestError };
    } else {
      const friendshipStatus = isUser1
        ? FriendshipStatus.PENDING_ME
        : FriendshipStatus.PENDING_THEM;
      return { data: friendshipStatus, error: friendRequestError };
    }
  }

  return { data: FriendshipStatus.NONE, error: null };
}

export default getFriendshipStatus;
