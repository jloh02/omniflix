import { createClient } from "@/utils/supabase/server";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <LogoutButton /> : <LoginButton />;
}
