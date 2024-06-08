import React from "react";
import addToFavorites from "@/utils/database/favorites/addToFavorites";
import isFavorited from "@/utils/database/favorites/isFavorited";
import removeFromFavorites from "@/utils/database/favorites/removeFromFavorites";
import { MediaType } from "@/utils/constants";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoadableCardButton from "./LoadableCardButton";

const FavoriteButton: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = (props) => {
  return (
    <LoadableCardButton
      {...props}
      checkEnabledFn={isFavorited}
      disableFn={removeFromFavorites}
      enableFn={addToFavorites}
      loadingText="Loading..."
      enabledText="Remove from Favorites"
      disabledText="Add to Favorites"
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
