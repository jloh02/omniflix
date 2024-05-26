import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import { Typography } from "@mui/material";
import React from "react";

export default async function UserProfile() {
  return (
    <UserPageTemplate>
      <Typography variant="h5">Friends</Typography>
      <Typography>*In development</Typography>
    </UserPageTemplate>
  );
}
