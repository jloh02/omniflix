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
import { MOVIES_PAGE_ROUTE, MediaType } from "@/utils/constants";
import FavoriteButton from "./FavoriteButton";
import AddToWatchlistButton from "./AddToWatchlistButton";
import LikeDislikeButtons from "./LikeDislikeButtons";
import Link from "next/link";

type MovieCardProps = {
  movie: IMovie;
  showLabel?: boolean;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, showLabel = true }) => {
  return (
    <Card className="relative w-52 h-full">
      <Link href={`${MOVIES_PAGE_ROUTE}/${movie.imdbId}`}>
        <CardMedia component="img" src={movie.posterUrl} className="h-72" />
      </Link>
      <CardContent className="p-2.5 last:pb-8">
        <Box display="flex" justifyContent="space-between" className="mb-2">
          <Box display="flex" gap={1}>
            <FavoriteButton
              mediaType={MediaType.MOVIE}
              mediaId={movie.imdbId}
            />
            <AddToWatchlistButton
              mediaType={MediaType.MOVIE}
              mediaId={movie.imdbId}
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
            mediaId={movie.imdbId}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
