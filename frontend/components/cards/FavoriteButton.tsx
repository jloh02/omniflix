import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
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
  const [hover, setHover] = useState(false);
  const [isFavoritedState, setIsFavoritedState] = useState<boolean>(false);

  useEffect(() => {
    const checkIsFavorited = async () => {
      const favorited = await isFavorited(mediaType, mediaId);
      setIsFavoritedState(favorited ?? false);
    };

    checkIsFavorited();
  }, [mediaType, mediaId]);

  return (
    <Tooltip
      title={isFavoritedState ? "Remove from Favorites" : "Add to Favorites"}
    >
      <IconButton
        onClick={async () => {
          if (isFavoritedState) {
            await removeFromFavorites(mediaType, mediaId);
            setIsFavoritedState(false);
          } else {
            await addToFavorites(mediaType, mediaId);
            setIsFavoritedState(true);
          }
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{ color: "red" }}
        className="p-0 pr-2"
      >
        {isFavoritedState || hover ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;