import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Theme,
  Tooltip,
  useTheme,
} from "@mui/material";
import isWatchlisted from "@/utils/database/watchlist/isWatchlisted";
import { Add, Check } from "@mui/icons-material";
import addToWatchlist from "@/utils/database/watchlist/addToWatchlist";
import { MediaType } from "@/utils/constants";
import removeFromWatchlist from "@/utils/database/watchlist/removeFromWatchlist";

const AddToWatchlistButton: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = ({ mediaType, mediaId }) => {
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkIsWatchlisted = useCallback(async () => {
    return await isWatchlisted(mediaType, mediaId);
  }, [mediaType, mediaId, isLoading, isAddedToWatchlist]);

  useEffect(() => {
    checkIsWatchlisted().then((watchlisted) => {
      setIsAddedToWatchlist(watchlisted ?? false);
      setIsLoading(false);
    });
  }, [mediaType, mediaId]);

  const iconStyle = (showOnAdded: boolean) => {
    return {
      position: "absolute",
      color: (theme: Theme) =>
        showOnAdded === isAddedToWatchlist
          ? theme.palette.text.primary
          : "transparent",
      transform: isAddedToWatchlist ? "rotate(0)" : "rotate(-90deg)",
      transition: "all 0.2s ease-out",
    };
  };

  return (
    <Box>
      <Tooltip
        title={
          isLoading
            ? "Loading Watchlist"
            : isAddedToWatchlist
              ? "Remove from Watchlist"
              : "Add to Watchlist"
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
                if (isAddedToWatchlist) {
                  const success = await removeFromWatchlist(mediaType, mediaId);
                  if (success) setIsAddedToWatchlist(false);
                } else {
                  const success = await addToWatchlist(mediaType, mediaId);
                  if (success) setIsAddedToWatchlist(true);
                }
                setIsLoading(false);
              }}
              sx={{ height: 30, width: 30 }}
            >
              <Check sx={iconStyle(true)} />
              <Add sx={iconStyle(false)} />
            </IconButton>
          )}
        </Box>
      </Tooltip>
    </Box>
  );
};

export default AddToWatchlistButton;
