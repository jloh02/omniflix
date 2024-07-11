"use client";
import React, { useEffect, useOptimistic, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import followUser from "@/utils/database/followers/followUser";
import unfollowUser from "@/utils/database/followers/unfollowUser";
import { FriendshipStatus } from "@/utils/constants";
import sendFriendRequest from "@/utils/database/friends/sendFriendRequest";
import unfriendUser from "@/utils/database/friends/unfriendUser";
import rejectFriendRequest from "@/utils/database/friends/rejectFriendRequest";

interface FriendButtonProps {
  userId: string;
  friendshipStatus: FriendshipStatus;
}

const FriendButton: React.FC<FriendButtonProps> = ({
  userId,
  friendshipStatus,
}) => {
  const [friendship, setFriendship] =
    useState<FriendshipStatus>(friendshipStatus);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [tooltipTitle1, setTooltipTitle] = useState("");
  // const [button1, setButton] = useState(<></>);

  const AddFriendButton = (
    <Button
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "dodgerblue !important",
        "&:hover": {
          backgroundColor: "deepskyblue !important",
        },
      }}
      onClick={async () => {
        console.log(`Add friend: friendshipStatus=${friendship}`);
        setIsLoading(true);
        const error = await sendFriendRequest(userId);
        if (!error) setFriendship(FriendshipStatus.PENDING_THEM);
        setIsLoading(false);
        console.log(
          `Error: ${error}, Friend added: friendshipStatus=${friendship}`,
        );
      }}
    >
      Add Friend
    </Button>
  );

  const CancelFriendRequestButton = (
    <Button
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "grey !important",
        "&:hover": {
          backgroundColor: "dimgrey !important",
        },
      }}
      onClick={async () => {
        setIsLoading(true);
        const error = await rejectFriendRequest(userId);
        if (!error) setFriendship(FriendshipStatus.NONE);
        setIsLoading(false);
      }}
    >
      Requested
    </Button>
  );

  const UnfriendButton = (
    <Button
      variant="contained"
      size="small"
      sx={{
        backgroundColor: "grey !important",
        "&:hover": {
          backgroundColor: "dimgrey !important",
        },
      }}
      onClick={async () => {
        setIsLoading(true);
        const error = await unfriendUser(userId);
        if (!error) setFriendship(FriendshipStatus.NONE);
        setIsLoading(false);
      }}
    >
      Friends
    </Button>
  );

  let tooltipTitle, button;
  switch (friendshipStatus) {
    case FriendshipStatus.NONE:
      tooltipTitle = isLoading ? "Loading..." : "Add friend";
      button = AddFriendButton;
      break;
    case FriendshipStatus.PENDING_ME:
      tooltipTitle = isLoading ? "Loading..." : "Friend request pending";
      button = CancelFriendRequestButton;
      break;
    case FriendshipStatus.PENDING_THEM:
      tooltipTitle = isLoading ? "Loading..." : "Cancel friend request";
      button = CancelFriendRequestButton;
      break;
    case FriendshipStatus.FRIENDS:
      tooltipTitle = isLoading ? "Loading..." : "Unfriend";
      button = UnfriendButton;
      break;
  }
  // setTooltipTitle(tooltipTitle);
  // setButton(button);

  return (
    <Box key={friendship}>
      <Tooltip title={tooltipTitle}>{button}</Tooltip>
      <Typography>{friendship}</Typography>
    </Box>
  );
};

export default FriendButton;
