import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface MovieCardProps {
  posterUrl: string;
  title: string;
  year: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ posterUrl, title, year }) => {
  return (
    <Card className="h-full w-full" sx={{ maxWidth: 200, maxHeight: 500 }}>
      <CardMedia component="img" image={posterUrl} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{year}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
