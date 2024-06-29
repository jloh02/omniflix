"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "@/utils/supabase/types.gen";

async function getUserFollowers(targetUserId?: string): Promise<
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

  // Get followers user ids from database
  const { data: followerData, error: followerError } = await supabase
    .from(TableNames.USER_FOLLOWING)
    .select("user_id")
    .eq("following_id", targetUserId ?? user.id)
    .returns<Tables<TableNames.USER_FOLLOWING>[]>();

  if (followerError) {
    return { data: null, error: followerError };
  }

  // Get followers users info from database
  const followerUserData = await Promise.all(
    followerData.map(async (follower) => {
      const { data, error } = await supabase
        .from(TableNames.USERS_INFO)
        .select("*")
        .eq("user_id", follower.user_id)
        .limit(1)
        .returns<Tables<TableNames.USERS_INFO>[]>()
        .single();

      if (!data) {
        throw new Error(error.message);
      }

      return data;
    }),
  );

  return { data: followerUserData, error: null };
}

export default getUserFollowers;
