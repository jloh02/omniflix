"use client";

import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import getFavorites from "@/utils/database/favorites/getFavorites";
import { MediaType } from "@/utils/constants";
import IMovieDetails from "@/utils/types/IMovieTvSeriesDetails";
import MovieTvSeriesCard from "@/components/cards/MovieTvSeriesCard";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<IMovieDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const data = await getFavorites(MediaType.MOVIE);
        setFavorites(data ?? ([] as IMovieDetails[]));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (isLoading) {
    return (
      <Typography variant="body1" className="mt-4">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" className="mt-4">
        {error}
      </Typography>
    );
  }

  return favorites.length > 0 ? (
    <Grid container spacing={3} className="mt-0 items-stretch">
      {favorites.map((movie: IMovieDetails) => (
        <Grid item>
          <MovieTvSeriesCard media={movie} type={MediaType.MOVIE} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="body1" className="mt-4">
      No Favorites found.
    </Typography>
  );
};

export default Favorites;
