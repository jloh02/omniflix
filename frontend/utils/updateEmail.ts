"use server";
import { createClient } from "@/utils/supabase/server";

async function updateEmail(newEmail: string): Promise<string | null> {
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
    email: newEmail,
  });

  return error?.message || null;
}

export default updateEmail;
