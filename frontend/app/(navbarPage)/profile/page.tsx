"use server";
import { Typography } from "@mui/material";
import UserProfileRow from "@/components/userProfile/UserProfileRow";
import React from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import getUserAccountInfo from "@/utils/database/userProfile/getUserAccountInfo";
import updateUserAccountInfo from "@/utils/database/userProfile/updateUserAccountInfo";
import { createClient } from "@/utils/supabase/server";
import { resetPassword, updateEmail } from "@/utils/supabase/auth";

export default async function UserProfile() {
  const userInfo = await getUserAccountInfo();

  // Fetch user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <UserPageTemplate>
      <Typography variant="h5">Basic Info</Typography>
      <UserProfileRow
        label="Name"
        value={userInfo.name || ""}
        onUpdate={async (value) => {
          "use server";
          return await updateUserAccountInfo("name", value);
        }}
      />
      <UserProfileRow
        label="Username"
        value={userInfo.username}
        onUpdate={async (value) => {
          "use server";
          return await updateUserAccountInfo("username", value);
        }}
      />
      <UserProfileRow
        label="Bio"
        value={userInfo.bio || ""}
        onUpdate={async (value) => {
          "use server";
          return await updateUserAccountInfo("bio", value);
        }}
      />
      <UserProfileRow
        label="Email"
        value={user?.email || ""}
        onUpdate={async (value) => {
          "use server";
          return await updateEmail(value);
        }}
      />
      <UserProfileRow
        label="Password"
        value=""
        onUpdate={async (value) => {
          "use server";
          return await resetPassword(value);
        }}
      />
      {/* <DeleteAccountButton /> */}
    </UserPageTemplate>
  );
}
