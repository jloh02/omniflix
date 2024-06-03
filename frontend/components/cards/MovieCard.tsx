import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import IMovie from "@/utils/types/IMovie";
import { MediaType } from "@/utils/constants";
import { FavoriteButton } from "./FavoriteButton";
import { AddToWatchlistButton } from "./AddToWatchlistButton";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="relative w-52 h-full">
      <CardMedia component="img" image={movie.poster} className="h-72" />
      <Box display="flex" justifyContent="space-between" p={1}>
        <Box>
          <FavoriteButton mediaType={MediaType.MOVIE} mediaId={movie.imdbID} />
          <AddToWatchlistButton
            mediaType={MediaType.MOVIE}
            mediaId={movie.imdbID}
          />
        </Box>
        <Chip
          label="Movie"
          sx={{
            color: "white",
            backgroundColor: (theme) => theme.palette.primary.light,
          }}
        />
      </Box>
      <CardContent className="p-2.5 last:pb-8">
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
          <IconButton>
            <ThumbUp />
          </IconButton>
          <IconButton>
            <ThumbDown />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
