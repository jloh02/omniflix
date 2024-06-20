"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "@/utils/constants";
import { Tables } from "@/utils/supabase/types.gen";

async function getUserAccountInfo(): Promise<Tables<TableNames.USERS_INFO>> {
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
    .eq("user_id", user.id)
    .limit(1)
    .returns<Tables<TableNames.USERS_INFO>[]>();

  if (error) {
    throw new Error(
      "Error encountered when getting user info. Please try again later.",
    );
  }

  return data[0];
}

export default getUserAccountInfo;
