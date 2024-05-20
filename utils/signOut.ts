import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function signOut() {
  "use server";

  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
