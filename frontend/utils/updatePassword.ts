"use server";
import { createClient } from "@/utils/supabase/server";

async function updatePassword(newPassword: string): Promise<string | null> {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Update user password
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return error?.message || null;
}

export default updatePassword;
