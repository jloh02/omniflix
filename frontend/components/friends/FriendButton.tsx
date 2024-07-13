"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Typography,
} from "@mui/material";
import { FriendshipStatus } from "@/utils/constants";
import sendFriendRequest from "@/utils/database/friends/sendFriendRequest";
import unfriendUser from "@/utils/database/friends/unfriendUser";
import rejectFriendRequest from "@/utils/database/friends/rejectFriendRequest";
import { PersonAdd } from "@mui/icons-material";
import acceptFriendRequest from "@/utils/database/friends/acceptFriendRequest";

interface FriendButtonProps {
  userId: string;
  username: string;
  friendshipStatus: FriendshipStatus;
}

const FriendButton: React.FC<FriendButtonProps> = ({
  userId,
  username,
  friendshipStatus,
}) => {
  const [friendship, setFriendship] =
    useState<FriendshipStatus>(friendshipStatus);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);

  const AddFriendButton = (
    <Tooltip title={isLoading ? "Loading..." : "Add friend"}>
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
          setIsLoading(true);
          const error = await sendFriendRequest(userId);
          if (!error) setFriendship(FriendshipStatus.PENDING_THEM);
          setIsLoading(false);
        }}
      >
        Add Friend
      </Button>
    </Tooltip>
  );

  const PendingFriendRequestButton = (
    <>
      <Tooltip title={isLoading ? "Loading..." : "Pending friend request"}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "grey !important",
            "&:hover": {
              backgroundColor: "dimgrey !important",
            },
          }}
          onClick={() => {
            setIsConfirmationDialogOpen(true);
          }}
        >
          Pending...
        </Button>
      </Tooltip>
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
      >
        <DialogContent>
          <Box display="flex" gap={1}>
            <PersonAdd />
            <Typography>{username} has sent you a friend request</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box width="100%" display="flex" justifyContent="space-evenly">
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
                const error = await acceptFriendRequest(userId);
                if (!error) {
                  setFriendship(FriendshipStatus.FRIENDS);
                  setIsConfirmationDialogOpen(false);
                }
              }}
            >
              Accept
            </Button>
            <Button
              sx={{ color: "white" }}
              onClick={async () => {
                const error = await rejectFriendRequest(userId);
                if (!error) {
                  setFriendship(FriendshipStatus.NONE);
                  setIsConfirmationDialogOpen(false);
                }
              }}
              autoFocus
            >
              Reject
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );

  const CancelFriendRequestButton = (
    <Tooltip title={isLoading ? "Loading..." : "Cancel friend request"}>
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
    </Tooltip>
  );

  const UnfriendButton = (
    <Tooltip title={isLoading ? "Loading..." : "Unfriend"}>
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
    </Tooltip>
  );

  return (
    <Box>
      {friendship === FriendshipStatus.NONE && AddFriendButton}
      {friendship === FriendshipStatus.PENDING_ME && PendingFriendRequestButton}
      {friendship === FriendshipStatus.PENDING_THEM &&
        CancelFriendRequestButton}
      {friendship === FriendshipStatus.FRIENDS && UnfriendButton}
    </Box>
  );
};

export default FriendButton;
