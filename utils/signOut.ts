"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { HOME_PAGE_ROUTE } from "./constants";

export default async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect(HOME_PAGE_ROUTE);
}
