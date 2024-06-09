import { Box, Button, Divider, Typography } from "@mui/material";
import UserProfileRow from "@/components/userProfile/UserProfileRow";
import React from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";

const PasswordRow: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box width="100px">
          <Typography>Password</Typography>
        </Box>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            sx={{
              color: "#0088cc !important",
            }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default async function UserProfile() {
  return (
    <UserPageTemplate>
      <Typography variant="h5">Basic Info</Typography>
      <Typography>*In development</Typography>
      <UserProfileRow name="Name" value="John Smith" />
      <UserProfileRow name="Username" value="@johnsmith" />
      <UserProfileRow name="Email" value="johnsmith@gmail.com" />
      <PasswordRow />
    </UserPageTemplate>
  );
}
