import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import TabbedView from "@/components/tabbedView/TabbedView";
import { Typography } from "@mui/material";
import React from "react";

export default async function UserProfile() {
  return (
    <UserPageTemplate>
      <TabbedView tabLabels={["Friends", "Friend Requests", "Search"]}>
        <Typography>*In development</Typography>
        <Typography>*In development</Typography>
        <Typography>*In development</Typography>
      </TabbedView>
    </UserPageTemplate>
  );
}
