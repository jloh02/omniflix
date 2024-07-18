import { createClient } from "@/utils/supabase/server";
import LoginButton from "./LoginButton";
import UserMenu from "./UserMenu";
import getUserAccountInfo from "@/utils/database/userProfile/getUserAccountInfo";
import { Typography } from "@mui/material";

export default async function AuthButton() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { name } = await getUserAccountInfo();

  return user ? (
    <>
      <Typography variant="body1" paddingRight={1}>
        Hi {name}!
      </Typography>
      <UserMenu />
    </>
  ) : (
    <LoginButton />
  );
}
