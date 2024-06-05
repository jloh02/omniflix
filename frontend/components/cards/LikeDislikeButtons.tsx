import React, { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { MediaType } from "@/utils/constants";

const LikeDislikeButtons: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = ({ mediaType, mediaId }) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const [isHoverOverLiked, setHoverOverLiked] = useState<boolean>(false);
  const [isDisliked, setDisliked] = useState<boolean>(false);
  const [isHoverOverDisliked, setHoverOverDisliked] = useState<boolean>(false);

  return (
    <Box>
      <Tooltip title={isLiked ? "Remove like" : "Like"}>
        <IconButton
          onMouseEnter={() => setHoverOverLiked(true)}
          onMouseLeave={() => setHoverOverLiked(false)}
          sx={{ color: "green" }}
        >
          {isLiked || isHoverOverLiked ? <ThumbUp /> : <ThumbUpOutlined />}
        </IconButton>
      </Tooltip>
      <Tooltip title={isDisliked ? "Remove dislike" : "Dislike"}>
        <IconButton
          onMouseEnter={() => setHoverOverDisliked(true)}
          onMouseLeave={() => setHoverOverDisliked(false)}
          sx={{ color: "red" }}
        >
          {isDisliked || isHoverOverDisliked ? (
            <ThumbDown />
          ) : (
            <ThumbDownOutlined />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LikeDislikeButtons;
