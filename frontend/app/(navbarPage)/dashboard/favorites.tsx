"use client";

import React from "react";
import { Grid } from "@mui/material";
import IMovie from "@/utils/types/IMovie";
import MovieCard from "../movies/movieCard";

const seed: IMovie[] = [
  {
    title: "The Shawshank Redemption",
    year: "1994",
    imdbID: "tt0111161",
    poster: "https://m.media-amazon.com/images/I/51S5jxUoEGL._AC_SY445_.jpg",
  },
  {
    title: "The Godfather",
    year: "1972",
    imdbID: "tt0068646",
    poster: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_SY445_.jpg",
  },
  {
    title: "The Dark Knight",
    year: "2008",
    imdbID: "tt0468569",
    poster: "https://m.media-amazon.com/images/I/51l2e1ODNKl._AC_SY445_.jpg",
  },
];

const Favorites: React.FC = () => {
  return (
    <Grid container spacing={3} className="mt-0 items-stretch">
      {seed.map((movie: IMovie) => (
        <Grid item>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Favorites;
