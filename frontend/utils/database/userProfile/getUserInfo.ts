"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";
import { PostgrestError } from "@supabase/supabase-js";

async function getUserInfo(username: string): Promise<
  | {
      data: Tables<TableNames.USERS_INFO> | null;
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

  // Fetch user info
  const { data, error } = await supabase
    .from(TableNames.USERS_INFO)
    .select("*")
    .eq("username", username)
    .limit(1)
    .returns<Tables<TableNames.USERS_INFO>>()
    .single();

  return { data, error };
}

export default getUserInfo;
