"use server";

import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from "@/utils/constants";

const signIn = async (email: string, password: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};

const signUp = async (email: string, password: string) => {
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
    return false;
  }

  return true;
};

const sendPasswordResetLink = async (email: string) => {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    console.error(error);
    return false;
  }

  return true;
};

export { signIn, signUp, sendPasswordResetLink as forgotPassword };
