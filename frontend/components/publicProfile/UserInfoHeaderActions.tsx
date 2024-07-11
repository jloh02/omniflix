"use client";
import { Box } from "@mui/material";
import ShareButton from "../socialShare/ShareButton";
import FollowButton from "../following/FollowButton";
import { FriendshipStatus } from "@/utils/constants";
import FriendButton from "../friends/FriendButton";

interface UserInfoHeaderActionsProps {
  userId: string;
  name: string;
  isFollowing: boolean;
  friendshipStatus: FriendshipStatus;
  isCurrentUser: boolean;
}

const UserInfoHeaderActions: React.FC<UserInfoHeaderActionsProps> = ({
  userId,
  name,
  isFollowing,
  friendshipStatus,
  isCurrentUser,
}) => {
  return (
    <Box display="flex" marginY={1} gap={1}>
      {!isCurrentUser && (
        <>
          <FollowButton userId={userId} isFollowingUser={isFollowing} />
          <FriendButton userId={userId} friendshipStatus={friendshipStatus} />
        </>
      )}
      <ShareButton text={`Check out ${name}'s profile on Omniflix!`} />
    </Box>
  );
};

export default UserInfoHeaderActions;
