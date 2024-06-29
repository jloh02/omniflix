"use server";
import { Box, Button, List, Typography } from "@mui/material";
import React from "react";
import getUserFollowing from "@/utils/database/followers/getUserFollowing";
import UserListItem from "@/components/following/UserListItem";
import FollowButton from "@/components/following/FollowButton";

const Following: React.FC = async () => {
  const { data: followingUsersInfo, error } = (await getUserFollowing()) || {};

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box>
      <List>
        {followingUsersInfo?.map(({ user_id, name, username }) => (
          <UserListItem
            key={user_id}
            name={name}
            username={username}
            button={<FollowButton userId={user_id} isFollowingUser={true} />}
          />
        ))}
      </List>
    </Box>
  );
};

export default Following;
