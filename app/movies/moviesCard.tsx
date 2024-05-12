import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface MovieCardProps {
  posterUrl: string;
  title: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterUrl, title }) => {
  return (
    <Card sx={{ maxWidth: 200, maxHeight: 500 }}>
      <CardMedia component="img" image={posterUrl} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
