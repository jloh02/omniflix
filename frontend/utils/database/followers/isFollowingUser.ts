"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "@/utils/supabase/types.gen";

async function isFollowingUser(targetUserId: string): Promise<
  | {
      data: boolean | null;
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
  const { data, error } = await supabase
    .from(TableNames.USER_FOLLOWING)
    .select("*")
    .eq("user_id", user.id)
    .eq("following_id", targetUserId)
    .limit(1)
    .returns<Tables<TableNames.USER_FOLLOWING>[]>();

  if (error) {
    return { data, error };
  }

  return { data: data.length > 0, error };
}

export default isFollowingUser;
