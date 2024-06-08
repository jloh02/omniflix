import React from "react";
import { Theme } from "@mui/material";
import isWatchlisted from "@/utils/database/watchlist/isWatchlisted";
import { Add, Check } from "@mui/icons-material";
import addToWatchlist from "@/utils/database/watchlist/addToWatchlist";
import { MediaType } from "@/utils/constants";
import removeFromWatchlist from "@/utils/database/watchlist/removeFromWatchlist";
import LoadableCardButton from "./LoadableCardButton";

const AddToWatchlistButton: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = (props) => {
  return (
    <LoadableCardButton
      {...props}
      checkEnabledFn={isWatchlisted}
      disableFn={removeFromWatchlist}
      enableFn={addToWatchlist}
      loadingText="Loading..."
      enabledText="Remove from Watchlist"
      disabledText="Add to Watchlist"
      childIcon={(isEnabled: boolean) => {
        const iconStyle = (showOnAdded: boolean) => {
          return {
            color: (theme: Theme) =>
              showOnAdded === isEnabled
                ? theme.palette.text.primary
                : "transparent",
            transform: isEnabled ? "rotate(0)" : "rotate(-90deg)",
            transition: "transform 0.2s ease-out, color 0.15s linear",
          };
        };
        return (
          <>
            <Check sx={{ position: "absolute", ...iconStyle(true) }} />
            <Add sx={iconStyle(false)} />
          </>
        );
      }}
    />
  );
};

export default AddToWatchlistButton;
