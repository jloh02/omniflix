"use client";
import { Box } from "@mui/material";
import ShareButton from "../socialShare/ShareButton";
import FollowButton from "../following/FollowButton";

interface UserInfoHeaderActionsProps {
  userId: string;
  name: string;
  isFollowing: boolean;
  isCurrentUser: boolean;
}

const UserInfoHeaderActions: React.FC<UserInfoHeaderActionsProps> = ({
  userId,
  name,
  isFollowing,
  isCurrentUser,
}) => {
  return (
    <Box display="flex" marginY={1} gap={1}>
      {!isCurrentUser && (
        <FollowButton userId={userId} isFollowingUser={isFollowing} />
      )}
      <ShareButton text={`Check out ${name}'s profile on Omniflix!`} />
    </Box>
  );
};

export default UserInfoHeaderActions;
