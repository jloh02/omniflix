"use server";
import { Avatar, Box, Typography } from "@mui/material";
import ShareButton from "../socialShare/ShareButton";
import FollowButton from "../following/FollowButton";
import isFollowingUser from "@/utils/database/followers/isFollowingUser";

interface UserInfoHeaderProps {
  userId: string;
  name: string;
  username: string;
  bio: string;
}

const UserInfoHeader: React.FC<UserInfoHeaderProps> = async ({
  userId,
  name,
  username,
  bio,
}) => {
  const { data: isFollowing, error: isFollowingError } =
    (await isFollowingUser(userId)) || {};

  return (
    <Box
      width="100%"
      minHeight="30vh"
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
            <Typography variant="h4">{name}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>@{username}</Typography>
            <Box display="flex" marginY={1} gap={1}>
              <FollowButton
                userId={userId}
                isFollowingUser={isFollowing ?? false}
              />
              <ShareButton text={`Check out ${name}'s profile on Omniflix!`} />
            </Box>
          </Box>
        </Box>
        <Typography>{bio}</Typography>
      </Box>
    </Box>
  );
};

export default UserInfoHeader;
