import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import IMovie from "@/utils/types/IMovie";
import { MediaType } from "@/utils/constants";
import FavoriteButton from "./FavoriteButton";
import AddToWatchlistButton from "./AddToWatchlistButton";
import LikeDislikeButtons from "./LikeDislikeButtons";

type MovieCardProps = {
  movie: IMovie;
  showLabel?: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, showLabel = true }) => {
  return (
    <Card className="relative w-52 h-full">
      <CardMedia component="img" image={movie.poster} className="h-72" />
      <CardContent className="p-2.5 last:pb-8">
        <Box display="flex" justifyContent="space-between" className="mb-2">
          <Box>
            <FavoriteButton
              mediaType={MediaType.MOVIE}
              mediaId={movie.imdbID}
            />
            <AddToWatchlistButton
              mediaType={MediaType.MOVIE}
              mediaId={movie.imdbID}
            />
          </Box>
          {showLabel ? (
            <Chip
              label="Movie"
              sx={{
                color: "white",
                backgroundColor: (theme) => theme.palette.primary.light,
              }}
            />
          ) : null}
        </Box>
        <Typography
          variant="body1"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {movie.title}
        </Typography>
        <Typography variant="body2">{movie.year}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={1}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <LikeDislikeButtons
            mediaType={MediaType.MOVIE}
            mediaId={movie.imdbID}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
