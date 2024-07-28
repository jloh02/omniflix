"use server";
import { Box, List, Typography } from "@mui/material";
import React from "react";
import UserListItem from "@/components/following/UserListItem";
import FriendButton from "@/components/friends/FriendButton";
import { FriendshipStatus } from "@/utils/constants";
import getUserFriendRequests from "@/utils/database/friends/getUserFriendRequests";

const FriendRequests: React.FC = async () => {
  const { data: friendRequestsUsersInfo, error } =
    (await getUserFriendRequests()) || {};

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box>
      <List>
        {friendRequestsUsersInfo?.map(({ user_id, name, username }) => (
          <UserListItem
            key={user_id}
            name={name}
            username={username}
            button={
              <FriendButton
                userId={user_id}
                username={username}
                friendshipStatus={FriendshipStatus.PENDING_ME}
              />
            }
          />
        ))}
      </List>
    </Box>
  );
};

export default FriendRequests;
