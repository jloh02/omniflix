import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { LikeStatus, MediaType } from "@/utils/constants";
import LoadableCardButton from "./LoadableCardButton";
import addToLikeDislike from "@/utils/database/likesDislikes/addToLikeDislike";
import getLikeStatus from "@/utils/database/likesDislikes/getLikeStatus";
import removeFromLikeDislike from "@/utils/database/likesDislikes/removeFromLikeDislike";
import getLikeDislikeCount from "@/utils/database/likesDislikes/getLikeDislikeCount";

const LikeDislikeButtons: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = (props) => {
  const [likeStatus, setLikeStatus] = useState<LikeStatus>(LikeStatus.NONE);
  const [likeDislikeCount, setLikeDislikeCount] = useState<{
    likeCount: number;
    dislikeCount: number;
  }>({
    likeCount: 0,
    dislikeCount: 0,
  });

  useEffect(() => {
    getLikeStatus(props.mediaType, props.mediaId).then(setLikeStatus);
    getLikeDislikeCount(props.mediaType, props.mediaId).then(
      setLikeDislikeCount,
    );
  }, [props.mediaType, props.mediaId]);

  const LikeButton = (
    <Box display="flex" alignItems="center">
      <Typography style={{ color: "green" }}>
        {likeDislikeCount.likeCount}
      </Typography>
      <LoadableCardButton
        {...props}
        checkEnabledFn={() => Promise.resolve(likeStatus === LikeStatus.LIKE)}
        disableFn={async (mediaType, mediaId) => {
          const res = await removeFromLikeDislike(mediaType, mediaId);
          setLikeDislikeCount((count) => ({
            ...count,
            likeCount: count.likeCount - 1,
          }));
          setLikeStatus(LikeStatus.NONE);
          return res;
        }}
        enableFn={async (mediaType, mediaId) => {
          const res = await addToLikeDislike(
            mediaType,
            mediaId,
            LikeStatus.LIKE,
          );
          setLikeDislikeCount((count) => ({
            likeCount: count.likeCount + 1,
            dislikeCount:
              likeStatus === LikeStatus.DISLIKE
                ? count.dislikeCount - 1
                : count.dislikeCount,
          }));
          setLikeStatus(LikeStatus.LIKE);
          return res;
        }}
        loadingText="Loading..."
        enabledText="Remove Like"
        disabledText="Like"
        childIcon={(isEnabled: boolean) => {
          return (
            <>
              <ThumbUp
                className={`hover:opacity-100 ${isEnabled ? "opacity-100" : "opacity-0"}`}
                sx={{
                  color: "green",
                  position: "absolute",
                  transition: "opacity 0.2s ease-in",
                }}
              />
              <ThumbUpOutlined sx={{ color: "green" }} />
            </>
          );
        }}
      />
    </Box>
  );

  const DislikeButton = (
    <Box display="flex" alignItems="center">
      <LoadableCardButton
        {...props}
        checkEnabledFn={() =>
          Promise.resolve(likeStatus === LikeStatus.DISLIKE)
        }
        disableFn={async (mediaType, mediaId) => {
          const res = await removeFromLikeDislike(mediaType, mediaId);
          setLikeDislikeCount((count) => ({
            ...count,
            dislikeCount: count.dislikeCount - 1,
          }));
          setLikeStatus(LikeStatus.NONE);
          return res;
        }}
        enableFn={async (mediaType, mediaId) => {
          const res = await addToLikeDislike(
            mediaType,
            mediaId,
            LikeStatus.DISLIKE,
          );
          setLikeDislikeCount((count) => ({
            likeCount:
              likeStatus === LikeStatus.LIKE
                ? count.likeCount - 1
                : count.likeCount,
            dislikeCount: count.dislikeCount + 1,
          }));
          setLikeStatus(LikeStatus.DISLIKE);
          return res;
        }}
        loadingText="Loading..."
        enabledText="Remove dislike"
        disabledText="Dislike"
        childIcon={(isEnabled: boolean) => {
          return (
            <>
              <ThumbDown
                className={`hover:opacity-100 ${isEnabled ? "opacity-100" : "opacity-0"}`}
                sx={{
                  color: "red",
                  position: "absolute",
                  transition: "opacity 0.2s ease-in",
                }}
              />
              <ThumbDownOutlined sx={{ color: "red" }} />
            </>
          );
        }}
      />
      <Typography style={{ color: "red" }}>
        {likeDislikeCount.dislikeCount}
      </Typography>
    </Box>
  );

  return (
    <Box
      key={`${likeStatus}-${likeDislikeCount}`}
      display="flex"
      gap={1}
      padding={1}
    >
      {LikeButton}
      {DislikeButton}
    </Box>
  );
};

export default LikeDislikeButtons;
