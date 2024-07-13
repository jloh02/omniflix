import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import TabbedView from "@/components/tabbedView/TabbedView";
import { Typography } from "@mui/material";
import React from "react";
import Friends from "./friends";
import FriendRequests from "./friendRequests";

export default async function UserProfile() {
  return (
    <UserPageTemplate>
      <TabbedView tabLabels={["Friends", "Friend Requests", "Search"]}>
        <Friends />
        <FriendRequests />
        <Typography>*In development</Typography>
      </TabbedView>
    </UserPageTemplate>
  );
}
