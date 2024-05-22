import UserSectionHeader from "@/components/userPages/UserSectionHeader";
import UserSectionsNavMenu from "@/components/userPages/UserSectionsNavMenu";
import { Box, Button, Divider, Typography } from "@mui/material";
import UserProfileRow from "@/components/userProfile/UserProfileRow";
import React from "react";

const PasswordRow: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Box sx={{ width: 110 }}>
          <Typography>Password</Typography>
        </Box>
        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-start" }}
        >
          <Button>Change Password</Button>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default async function UserProfile() {
  return (
    <>
      <UserSectionHeader />
      <Box sx={{ width: "100%", display: "flex", alignItems: "flex-start" }}>
        <UserSectionsNavMenu />
        <Box
          sx={{
            flex: 1,
            margin: 2,
            padding: 2,
            borderRadius: 2,
            boxShadow: "0px 3px 5px 2px rgba(128, 128, 128, 0.5)",
          }}
        >
          <Typography variant="h5">Basic Info</Typography>
          <Typography>*In development</Typography>
          <UserProfileRow name="Name" value="John Smith" />
          <UserProfileRow name="Username" value="@johnsmith" />
          <UserProfileRow name="Email" value="johnsmith@gmail.com" />
          <PasswordRow />
        </Box>
      </Box>
    </>
  );
}
