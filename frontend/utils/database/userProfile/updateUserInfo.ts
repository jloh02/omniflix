import { createClient } from "@/utils/supabase/server";
import { TableNames } from "../../constants";
import { Tables } from "@/utils/supabase/types.gen";

async function updateUserInfo(column: string, value: string): Promise<boolean> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Update user info
  const { error } = await supabase
    .from(TableNames.USERS_INFO)
    .update({ [column]: value })
    .eq("user_id", user.id)
    .returns<Tables<TableNames.LIKES_DISLIKES>[]>();

  return !error;
}

export default updateUserInfo;
