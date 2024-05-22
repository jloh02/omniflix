import UserSectionHeader from "@/components/userPages/UserSectionHeader";
import UserSectionsNavMenu from "@/components/userPages/UserSectionsNavMenu";
import { Box, Container, Typography } from "@mui/material";

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
          <Typography>In development</Typography>
        </Box>
      </Box>
    </>
  );
}
