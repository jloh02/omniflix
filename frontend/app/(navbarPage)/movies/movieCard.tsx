import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
  Box,
  Theme,
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
import { MediaType } from "@/utils/constants";

interface MovieCardProps {
  movie: IMovie;
}

const FavoriteButton: React.FC<{ mediaType: MediaType; mediaId: string }> = ({
  mediaType,
  mediaId,
}) => {
  const [hover, setHover] = useState(false);
  const [isFavoritedState, setIsFavoritedState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkIsFavorited = async () => {
      const favorited = await isFavorited(mediaType, mediaId);
      setIsFavoritedState(favorited ?? false);
      setIsLoading(false);
    };

    checkIsFavorited();
  }, [mediaType, mediaId, isFavoritedState, isLoading]);

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
                  await removeFromFavorites(mediaType, mediaId);
                  setIsFavoritedState(false);
                } else {
                  await addToFavorites(mediaType, mediaId);
                  setIsFavoritedState(true);
                }
                setIsLoading(false);
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              sx={{ color: "yellow", height: 30, width: 30 }}
            >
              {isFavoritedState || hover ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          )}
        </Box>
      </Tooltip>
    </Box>
  );
};

const AddToWatchlistButton: React.FC<{
  mediaType: MediaType;
  mediaId: string;
}> = ({ mediaType, mediaId }) => {
  const [isAddedToWatchlist, setIsAddedToWatchlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    isWatchlisted(mediaType, mediaId).then((watchlisted) => {
      setIsAddedToWatchlist(watchlisted ?? false);
      setIsLoading(false);
    });
  }, [mediaType, mediaId, isLoading, isAddedToWatchlist]);

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
              ? "Already in Watchlist"
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
              onClick={() => {
                setIsLoading(true);
                setIsAddedToWatchlist(true);
                addToWatchlist(mediaType, mediaId).then((success) => {
                  setIsAddedToWatchlist(success);
                  setIsLoading(false);
                });
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

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="relative w-52 h-full">
      <CardMedia component="img" image={movie.poster} className="h-72" />
      <CardContent className="p-2.5 last:pb-2.5">
        <Box display="flex" sx={{ height: 40 }}>
          <FavoriteButton mediaType={MediaType.MOVIE} mediaId={movie.imdbID} />
          <AddToWatchlistButton
            mediaType={MediaType.MOVIE}
            mediaId={movie.imdbID}
          />
        </Box>
        <Typography variant="body1">{movie.title}</Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
