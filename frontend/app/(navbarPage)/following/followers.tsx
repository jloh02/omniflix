"use server";
import { Box, Button, List, Typography } from "@mui/material";
import React from "react";
import UserListItem from "@/components/following/UserListItem";
import getUserFollowers from "@/utils/database/followers/getUserFollowers";

const Followers: React.FC = async () => {
  const { data: followersUsersInfo, error } = (await getUserFollowers()) || {};

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

  return (
    <Box>
      <List>
        {followersUsersInfo?.map(({ user_id, name, username }) => (
          <UserListItem key={user_id} name={name} username={username} />
        ))}
      </List>
    </Box>
  );
};

export default Followers;
