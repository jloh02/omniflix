import { Typography } from "@mui/material";
import UserProfileRow from "@/components/userProfile/UserProfileRow";
import React from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import getUserInfo from "@/utils/database/userProfile/getUserInfo";

export default async function UserProfile() {
  const userInfo = await getUserInfo();

  return (
    <UserPageTemplate>
      <Typography variant="h5">Basic Info</Typography>
      <Typography>*In development</Typography>
      <UserProfileRow label="Name" value={userInfo.name || ""} />
      <UserProfileRow label="Username" value={userInfo.username} />
      <UserProfileRow label="Bio" value={userInfo.bio || ""} />
      <UserProfileRow label="Email" value="email" />
      <UserProfileRow label="Password" value="password" />
    </UserPageTemplate>
  );
}
