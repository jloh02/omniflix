import React, { useEffect, useState } from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import isWatchlisted from "@/utils/database/watchlist/isWatchlisted";
import { Add, Check } from "@mui/icons-material";
import addToWatchlist from "@/utils/database/watchlist/addToWatchlist";
import { MediaType } from "@/utils/constants";

export const AddToWatchlistButton: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = ({ mediaType, mediaId }) => {
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState<boolean>(false);
  const theme = useTheme();

  useEffect(() => {
    isWatchlisted(mediaType, mediaId).then((watchlisted) =>
      setIsAddedToWatchlist(watchlisted ?? false),
    );
  }, [mediaType, mediaId]);

  const iconStyle = (showOnAdded: boolean) => {
    return {
      position: "absolute",
      color:
        showOnAdded === isAddedToWatchlist
          ? theme.palette.text.primary
          : "transparent",
      transform: isAddedToWatchlist ? "rotate(0)" : "rotate(-90deg)",
      transition: "all 0.2s ease-out",
    };
  };

  return (
    <Tooltip
      title={isAddedToWatchlist ? "Already in Watchlist" : "Add to Watchlist"}
    >
      <IconButton
        disableRipple={isAddedToWatchlist}
        onClick={() => {
          setIsAddedToWatchlist(true);
          addToWatchlist(mediaType, mediaId).then((success) =>
            setIsAddedToWatchlist(success),
          );
        }}
      >
        <Check sx={iconStyle(true)} />
        <Add sx={iconStyle(false)} />
      </IconButton>
    </Tooltip>
  );
};
