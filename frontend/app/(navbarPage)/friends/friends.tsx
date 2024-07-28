"use server";
import { Box, List, Typography } from "@mui/material";
import React from "react";
import UserListItem from "@/components/following/UserListItem";
import getUserFriends from "@/utils/database/friends/getUserFriends";
import FriendButton from "@/components/friends/FriendButton";
import { FriendshipStatus } from "@/utils/constants";

const Friends: React.FC = async () => {
  const { data: friendsUsersInfo, error } = (await getUserFriends()) || {};

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box>
      <List>
        {friendsUsersInfo?.map(({ user_id, name, username }) => (
          <UserListItem
            key={user_id}
            name={name}
            username={username}
            button={
              <FriendButton
                userId={user_id}
                username={username}
                friendshipStatus={FriendshipStatus.FRIENDS}
              />
            }
          />
        ))}
      </List>
    </Box>
  );
};

export default Friends;
