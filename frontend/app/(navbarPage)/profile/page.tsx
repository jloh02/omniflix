"use server";
import { Typography } from "@mui/material";
import UserProfileRow from "@/components/userProfile/UserProfileRow";
import React from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import getUserInfo from "@/utils/database/userProfile/getUserInfo";
import updateUserInfo from "@/utils/database/userProfile/updateUserInfo";
import updateEmail from "@/utils/updateEmail";

export default async function UserProfile() {
  const userInfo = await getUserInfo();

  return (
    <UserPageTemplate>
      <Typography variant="h5">Basic Info</Typography>
      <UserProfileRow
        label="Name"
        value={userInfo.name || ""}
        updateFunction={async (value) => {
          "use server";
          return await updateUserInfo("name", value);
        }}
      />
      <UserProfileRow
        label="Username"
        value={userInfo.username}
        updateFunction={async (value) => {
          "use server";
          return await updateUserInfo("username", value);
        }}
      />
      <UserProfileRow
        label="Bio"
        value={userInfo.bio || ""}
        updateFunction={async (value) => {
          "use server";
          return await updateUserInfo("bio", value);
        }}
      />
      <UserProfileRow
        label="Email"
        value="email"
        updateFunction={async (value) => {
          "use server";
          return await updateEmail(value);
        }}
      />
      <UserProfileRow
        label="Password"
        value="password"
        updateFunction={async (value) => {
          "use server";
          //TODO
          return null;
        }}
      />
    </UserPageTemplate>
  );
}
