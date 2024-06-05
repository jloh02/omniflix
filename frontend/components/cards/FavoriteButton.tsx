import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import addToFavorites from "@/utils/database/favorites/addToFavorites";
import isFavorited from "@/utils/database/favorites/isFavorited";
import removeFromFavorites from "@/utils/database/favorites/removeFromFavorites";
import { MediaType } from "@/utils/constants";

const FavoriteButton: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = ({ mediaType, mediaId }) => {
  const [isFavoritedState, setIsFavoritedState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkIsFavorited = useCallback(async () => {
    const favorited = await isFavorited(mediaType, mediaId);
    setIsFavoritedState(favorited ?? false);
    setIsLoading(false);
  }, [isFavoritedState, isLoading, mediaType, mediaId]);

  useEffect(() => {
    checkIsFavorited();
  }, [mediaType, mediaId]);

  return (
    <Box>
      <Tooltip
        title={
          isLoading
            ? "Loading Favorites"
            : isFavoritedState
              ? "Remove from Favorites"
              : "Add to Favorites"
        }
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
          }}
        >
          {isLoading && (
            <CircularProgress size={20} color="secondary" sx={{ height: 30 }} />
          )}
          {!isLoading && (
            <IconButton
              onClick={async () => {
                setIsLoading(true);
                if (isFavoritedState) {
                  const success = await removeFromFavorites(mediaType, mediaId);
                  if (success) setIsFavoritedState(false);
                } else {
                  const success = await addToFavorites(mediaType, mediaId);
                  if (success) setIsFavoritedState(true);
                }
                setIsLoading(false);
              }}
              sx={{ color: "red", height: 30, width: 30 }}
            >
              <Box display="flex">
                <FavoriteIcon
                  className={`hover:opacity-100 ${isFavoritedState ? "opacity-100" : "opacity-0"}`}
                  sx={{
                    position: "absolute",
                    transition: "opacity 0.2s linear",
                  }}
                />
                <FavoriteBorderIcon />
              </Box>
            </IconButton>
          )}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default FavoriteButton;
