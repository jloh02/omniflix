"use client";
import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import IMovie from "@/utils/types/IMovie";
import MovieCard from "../movies/movieCard";
import getFavorites from "@/utils/database/getFavorites";
import IMovieDetails from "@/utils/types/IMovieDetails";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<IMovieDetails[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites("movie");
      setFavorites(data ?? ([] as IMovieDetails[]));
    };
    fetchFavorites();
  }, []);

  return (
    <>
      {favorites.length > 0 ? (
        <Grid container spacing={3} className="mt-0 items-stretch">
          {favorites.map((movie: IMovie) => (
            <Grid item>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" className="mt-4">
          No Favorites found.
        </Typography>
      )}
    </>
  );
};

export default Favorites;
