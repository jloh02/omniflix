import getUserInfo from "@/utils/database/userProfile/getUserInfo";
import { Avatar, Box, Typography } from "@mui/material";

const UserSectionHeader: React.FC = async () => {
  const userInfo = await getUserInfo();

  return (
    <Box
      width="100%"
      height="30vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(45deg, #FD7702 30%, #FF5003 90%)",
      }}
    >
      <Box
        width="60%"
        minWidth="500px"
        display="flex"
        flexDirection="column"
        alignItems="start"
        gap={1}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
          <Avatar sx={{ width: "15vh", height: "15vh" }} />
          <Box>
            <Typography variant="h4">{userInfo.name}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>
              @{userInfo.username}
            </Typography>
          </Box>
        </Box>
        <Typography>{userInfo.bio}</Typography>
      </Box>
    </Box>
  );
};

export default UserSectionHeader;
