("use server");

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

type AuthResponse = { success: boolean; error?: string };

const signIn = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
};

const signUp = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const origin = headers().get("origin");
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

const sendPasswordResetLink = async (email: string): Promise<AuthResponse> => {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "/reset-password",
  });

  if (error) {
    console.error(error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

const resetPassword = async (password: string): Promise<AuthResponse> => {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error(error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

const updateEmail = async (email: string): Promise<AuthResponse> => {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ email });

  if (error) {
    console.error(error);
    return { success: false, error: error.message };
  }

  return { success: true };
};

export type { AuthResponse };
export {
  signIn,
  signOut,
  signUp,
  sendPasswordResetLink,
  resetPassword,
  updateEmail,
};
