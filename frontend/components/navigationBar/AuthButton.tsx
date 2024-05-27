import { createClient } from "@/utils/supabase/server";
import LoginButton from "./LoginButton";
import UserMenu from "./UserMenu";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? <UserMenu /> : <LoginButton />;
}
