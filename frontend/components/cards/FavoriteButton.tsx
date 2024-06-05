import React from "react";
import addToFavorites from "@/utils/database/favorites/addToFavorites";
import isFavorited from "@/utils/database/favorites/isFavorited";
import removeFromFavorites from "@/utils/database/favorites/removeFromFavorites";
import { MediaType } from "@/utils/constants";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HoverableCardButton from "./HoverableCardButton";

const FavoriteButton: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = (props) => {
  return (
    <HoverableCardButton
      {...props}
      checkEnabledFn={isFavorited}
      disableFn={removeFromFavorites}
      enableFn={addToFavorites}
      loadingText="Loading Watchlist"
      enabledText="Remove from Watchlist"
      disabledText="Add to Watchlist"
      childIcon={(isEnabled: boolean) => {
        return (
          <>
            <FavoriteIcon
              className={`hover:opacity-100 ${isEnabled ? "opacity-100" : "opacity-0"}`}
              sx={{
                color: "red",
                position: "absolute",
                transition: "opacity 0.2s ease-in",
              }}
            />
            <FavoriteBorderIcon sx={{ color: "red" }} />
          </>
        );
      }}
    />
  );
};

export default FavoriteButton;
