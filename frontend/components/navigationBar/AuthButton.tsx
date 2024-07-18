import { createClient } from "@/utils/supabase/server";
import LoginButton from "./LoginButton";
import getUserAccountInfo from "@/utils/database/userProfile/getUserAccountInfo";
import AuthButtonClient from "./AuthButtonClient";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { name } = await getUserAccountInfo();

  return user ? <AuthButtonClient name={name} /> : <LoginButton />;
}
