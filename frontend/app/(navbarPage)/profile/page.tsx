"use server";
import { Typography } from "@mui/material";
import UserProfileRow from "@/components/userProfile/UserProfileRow";
import React from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import getUserInfo from "@/utils/database/userProfile/getUserInfo";
import updateUserInfo from "@/utils/database/userProfile/updateUserInfo";

export default async function UserProfile() {
  const userInfo = await getUserInfo();

  return (
    <UserPageTemplate>
      <Typography variant="h5">Basic Info</Typography>
      <Typography>*In development</Typography>
      <UserProfileRow
        label="Name"
        value={userInfo.name || ""}
        updateFunction={(value) => {
          "use server";
          updateUserInfo("name", value);
        }}
      />
      <UserProfileRow
        label="Username"
        value={userInfo.username}
        updateFunction={(value) => {
          "use server";
          updateUserInfo("username", value);
        }}
      />
      <UserProfileRow
        label="Bio"
        value={userInfo.bio || ""}
        updateFunction={(value) => {
          "use server";
          updateUserInfo("bio", value);
        }}
      />
      <UserProfileRow
        label="Email"
        value="email"
        updateFunction={(value) => {
          "use server";
          //TODO
        }}
      />
      <UserProfileRow
        label="Password"
        value="password"
        updateFunction={(value) => {
          "use server";
          //TODO
        }}
      />
    </UserPageTemplate>
  );
}
