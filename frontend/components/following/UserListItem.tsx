"use server";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import getUserFollowing from "@/utils/database/followers/getUserFollowing";
import { USER_PUBLIC_PROFILE_PAGE_ROUTE } from "@/utils/constants";
import Link from "next/link";

interface UserListItemProps {
  name: string;
  username: string;
  button?: React.ReactNode;
}

const UserListItem: React.FC<UserListItemProps> = async ({
  name,
  username,
  button,
}) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Tooltip title={`Go to ${name}'s profile`} placement="bottom-start">
        <Link
          href={`${USER_PUBLIC_PROFILE_PAGE_ROUTE}/${username}`}
          passHref
          style={{ flexGrow: 1 }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={`@${username}`} />
          </ListItem>
        </Link>
      </Tooltip>
      {button}
    </Box>
  );
};

export default UserListItem;
