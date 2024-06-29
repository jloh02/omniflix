"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "@/utils/supabase/types.gen";

async function getUserFollowing(targetUserId?: string): Promise<
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

  // Get following user ids from database
  const { data: followingData, error: followingError } = await supabase
    .from(TableNames.USER_FOLLOWING)
    .select("following_id")
    .eq("user_id", targetUserId ?? user.id)
    .returns<Tables<TableNames.USER_FOLLOWING>[]>();

  if (followingError) {
    return { data: null, error: followingError };
  }

  // Get following users info from database
  const followingUserData = await Promise.all(
    followingData.map(async (following) => {
      const { data, error } = await supabase
        .from(TableNames.USERS_INFO)
        .select("*")
        .eq("user_id", following.following_id)
        .limit(1)
        .returns<Tables<TableNames.USERS_INFO>[]>()
        .single();

      if (!data) {
        throw new Error(error.message);
      }

      return data;
    }),
  );

  return { data: followingUserData, error: null };
}

export default getUserFollowing;
