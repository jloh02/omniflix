"use server";

import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { TablesInsert } from "@/utils/supabase/types.gen";

async function addUserAccountInfo(
  name: string,
  username: string,
  bio: string,
): Promise<string> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Add user info
  const { error } = await supabase
    .from(TableNames.USERS_INFO)
    .insert({ user_id: user.id, name, username, bio })
    .returns<TablesInsert<TableNames.USERS_INFO>[]>();

  let errorMessage = error?.message;
  if (error?.code === "23505" && error?.message.includes("username")) {
    errorMessage = "The username is taken. Please select a different username.";
  }

  return errorMessage || "";
}

export default addUserAccountInfo;
