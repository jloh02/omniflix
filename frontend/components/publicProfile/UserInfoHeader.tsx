"use server";
import { Avatar, Box, Typography } from "@mui/material";
import isFollowingUser from "@/utils/database/followers/isFollowingUser";
import UserInfoHeaderActions from "./UserInfoHeaderActions";
import { createClient } from "@/utils/supabase/server";
import getFriendshipStatus from "@/utils/database/friends/getFriendshipStatus";
import { FriendshipStatus } from "@/utils/constants";

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
  // Fetch following status
  const { data: isFollowing, error: isFollowingError } =
    (await isFollowingUser(userId)) || {};

  // Fetch friendship status
  const { data: friendshipStatus, error: friendshipStatusError } =
    (await getFriendshipStatus(userId)) || {};

  // Fetch current user details
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not logged in, throw an error
  if (!user) {
    throw new Error("Please login again.");
  }

  // Check if user is the current user
  const isCurrentUser = user.id === userId;

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
            <UserInfoHeaderActions
              userId={userId}
              name={name}
              username={username}
              isFollowing={isFollowing ?? false}
              friendshipStatus={friendshipStatus ?? FriendshipStatus.NONE}
              isCurrentUser={isCurrentUser}
            />
          </Box>
        </Box>
        <Typography>{bio}</Typography>
      </Box>
    </Box>
  );
};

export default UserInfoHeader;
