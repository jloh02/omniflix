"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { PostgrestError } from "@supabase/supabase-js";
import { Tables } from "@/utils/supabase/types.gen";

async function getUserFriends(targetUserId?: string): Promise<
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

  // Get friend user ids from database
  const { data: friendData, error: friendError } = await supabase
    .from(TableNames.FRIENDSHIPS)
    .select("user_id2")
    .eq("user_id1", targetUserId ?? user.id)
    .returns<Tables<TableNames.FRIENDSHIPS>[]>();

  if (friendError) {
    return { data: null, error: friendError };
  }

  // Get friends users info from database
  const friendUserData = await Promise.all(
    friendData.map(async (friend) => {
      const { data, error } = await supabase
        .from(TableNames.USERS_INFO)
        .select("*")
        .eq("user_id", friend.user_id2)
        .limit(1)
        .returns<Tables<TableNames.USERS_INFO>[]>()
        .single();

      if (!data) {
        throw new Error(error.message);
      }

      return data;
    }),
  );

  return { data: friendUserData, error: null };
}

export default getUserFriends;
