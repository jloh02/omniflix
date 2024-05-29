"use client";

import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import IMovie from "@/utils/types/IMovie";
import MovieCard from "../movies/movieCard";
import getFavorites from "@/utils/database/getFavorites";

const seed: IMovie[] = [
  {
    title: "The Shawshank Redemptio",
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
  const [favorites, setFavorites] = useState<any>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites("movie");
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  return (
    <>
      <Grid container spacing={3} className="mt-0 items-stretch">
        {seed.map((movie: IMovie) => (
          <Grid item>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Typography>
        {favorites.length > 0 ? favorites.toString() : "No Favorite Movies"}
      </Typography>
    </>
  );
};

export default Favorites;
