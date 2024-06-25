"use client";
import React, { useOptimistic, useState } from "react";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import followUser from "@/utils/database/followers/followUser";
import unfollowUser from "@/utils/database/followers/unfollowUser";

interface FollowButtonProps {
  userId: string;
  isFollowingUser: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  userId,
  isFollowingUser,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(isFollowingUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Box>
      <Tooltip
        title={isLoading ? "Loading..." : isFollowing ? "Unfollow" : "Follow"}
      >
        {!isFollowing ? (
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
              const error = await followUser(userId);
              if (!error) setIsFollowing(true);
              setIsLoading(false);
            }}
          >
            Follow
          </Button>
        ) : (
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
              const error = await unfollowUser(userId);
              if (!error) setIsFollowing(false);
              setIsLoading(false);
            }}
          >
            Following
          </Button>
        )}
      </Tooltip>
    </Box>
  );
};

export default FollowButton;
