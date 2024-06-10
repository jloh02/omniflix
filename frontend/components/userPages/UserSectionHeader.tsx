import { Avatar, Box, Typography } from "@mui/material";

const UserSectionHeader: React.FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "30vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(45deg, #FD7702 30%, #FF5003 90%)",
      }}
    >
      <Avatar
        variant="rounded"
        sx={{ width: "15vh", height: "15vh", margin: "5vh" }}
      />
      <Box>
        <Typography variant="h4">Name</Typography>
        <Typography sx={{ fontStyle: "italic" }}>@Username</Typography>
      </Box>
    </Box>
  );
};

export default UserSectionHeader;
