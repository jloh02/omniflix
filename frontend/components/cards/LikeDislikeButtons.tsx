import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  ThumbDown,
  ThumbDownOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import { MediaType } from "@/utils/constants";
import LoadableCardButton from "./LoadableCardButton";

const LikeDislikeButtons: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = (props) => {
  const [isLiked, setLiked] = useState<boolean>(false);
  const [isHoverOverLiked, setHoverOverLiked] = useState<boolean>(false);
  const [isDisliked, setDisliked] = useState<boolean>(false);
  const [isHoverOverDisliked, setHoverOverDisliked] = useState<boolean>(false);

  //TODO integrate with backend
  return (
    <Box display="flex" gap={1} padding={1}>
      <LoadableCardButton
        {...props}
        checkEnabledFn={async () => false}
        disableFn={async () => true}
        enableFn={async () => true}
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
        checkEnabledFn={async () => false}
        disableFn={async () => true}
        enableFn={async () => true}
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
