import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
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

const LikeDislikeButtons: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = (props) => {
  const [likeStatus, setLikeStatus] = useState<LikeStatus>(LikeStatus.NONE);
  const [key, setKey] = useState(0);

  useEffect(() => {
    getLikeStatus(props.mediaType, props.mediaId).then(setLikeStatus);
  }, [props.mediaType, props.mediaId]);

  return (
    <Box display="flex" gap={1} padding={1}>
      <LoadableCardButton
        {...props}
        key={`like-${likeStatus}`}
        checkEnabledFn={() => Promise.resolve(likeStatus === LikeStatus.LIKE)}
        disableFn={async (
          mediaType: MediaType,
          mediaId: string,
        ): Promise<boolean | undefined> => {
          const res = await removeFromLikeDislike(mediaType, mediaId);
          setLikeStatus(LikeStatus.NONE);
          return res;
        }}
        enableFn={async (
          mediaType: MediaType,
          mediaId: string,
        ): Promise<boolean | undefined> => {
          const res = await addToLikeDislike(
            mediaType,
            mediaId,
            LikeStatus.LIKE,
          );
          setLikeStatus(LikeStatus.LIKE);
          setKey((prevKey) => prevKey + 1);
          return res;
        }}
        loadingText="Loading Likes"
        enabledText="Like"
        disabledText="Remove Like"
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

      <LoadableCardButton
        {...props}
        key={`dislike-${likeStatus}`}
        checkEnabledFn={() =>
          Promise.resolve(likeStatus === LikeStatus.DISLIKE)
        }
        disableFn={async (
          mediaType: MediaType,
          mediaId: string,
        ): Promise<boolean | undefined> => {
          const res = await removeFromLikeDislike(mediaType, mediaId);
          setLikeStatus(LikeStatus.NONE);
          return res;
        }}
        enableFn={async (
          mediaType: MediaType,
          mediaId: string,
        ): Promise<boolean | undefined> => {
          const res = await addToLikeDislike(
            mediaType,
            mediaId,
            LikeStatus.DISLIKE,
          );
          setLikeStatus(LikeStatus.DISLIKE);
          setKey((prevKey) => prevKey + 1);
          return res;
        }}
        loadingText="Loading Likes"
        enabledText="Dislike"
        disabledText="Remove dislike"
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
    </Box>
  );
};

export default LikeDislikeButtons;
