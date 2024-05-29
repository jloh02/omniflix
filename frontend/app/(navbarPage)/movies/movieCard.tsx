import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  useTheme,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IMovie from "@/utils/types/IMovie";
import addToFavorites from "@/utils/database/favorites/addToFavorites";
import isFavorited from "@/utils/database/favorites/isFavorited";
import removeFromFavorites from "@/utils/database/favorites/removeFromFavorites";
import isWatchlisted from "@/utils/database/watchlist/isWatchlisted";
import { Add, Check } from "@mui/icons-material";
import addToWatchlist from "@/utils/database/watchlist/addToWatchlist";

interface MovieCardProps {
  movie: IMovie;
}

const FavoriteButton: React.FC<{ mediaType: string; mediaId: string }> = ({
  mediaType,
  mediaId,
}) => {
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
        sx={{ color: "yellow" }}
      >
        {isFavoritedState || hover ? <StarIcon /> : <StarBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

const AddToWatchlistButton: React.FC<{
  mediaType: string;
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

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="relative w-48 h-full">
      <CardMedia component="img" image={movie.poster} className="h-72" />
      <FavoriteButton mediaType="movie" mediaId={movie.imdbID} />
      <AddToWatchlistButton mediaType="movie" mediaId={movie.imdbID} />
      <CardContent className="p-2.5 pb-2.5">
        <Typography variant="body1">{movie.title}</Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
