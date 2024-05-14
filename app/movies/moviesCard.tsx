import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import IMovie from "@/utils/types/IMovie";

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card className="h-full w-full" sx={{ maxWidth: 200, maxHeight: 500 }}>
      <CardMedia component="img" image={movie.poster} />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body1">{movie.year}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
