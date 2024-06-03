import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import IMovie from "@/utils/types/IMovie";
import { MediaType } from "@/utils/constants";
import { FavoriteButton } from "./FavoriteButton";
import { AddToWatchlistButton } from "./AddToWatchlistButton";

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="relative w-52 h-full">
      <CardMedia component="img" image={movie.poster} className="h-72" />
      <FavoriteButton mediaType={MediaType.MOVIE} mediaId={movie.imdbID} />
      <AddToWatchlistButton
        mediaType={MediaType.MOVIE}
        mediaId={movie.imdbID}
      />
      <CardContent className="p-2.5 last:pb-2.5">
        <Typography variant="body1">{movie.title}</Typography>
        <Typography variant="body2">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
