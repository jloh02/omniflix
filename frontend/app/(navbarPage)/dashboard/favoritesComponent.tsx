"use client";

import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import getFavorites from "@/utils/database/favorites/getFavorites";
import { MediaType } from "@/utils/constants";
import IMovieTvSeriesDetails from "@/utils/types/IMovieTvSeriesDetails";
import MovieTvSeriesCard from "@/components/cards/MovieTvSeriesCard";

interface FavoritesComponentProps {
  mediaType: MediaType;
}

const FavoritesComponent: React.FC<FavoritesComponentProps> = ({
  mediaType,
}) => {
  const [favorites, setFavorites] = useState<IMovieTvSeriesDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // TODO: Handle other media_type states
  if (mediaType !== MediaType.MOVIE && mediaType !== MediaType.TV_SERIES) {
    return (
      <Typography variant="body1" className="mt-4">
        WIP
      </Typography>
    );
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const data = await getFavorites(mediaType);
        setFavorites(data ?? ([] as IMovieTvSeriesDetails[]));
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
      {favorites.map((media: IMovieTvSeriesDetails, index) => (
        <Grid key={index} item>
          <MovieTvSeriesCard media={media} type={mediaType} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography variant="body1" className="mt-4">
      No Favorites found.
    </Typography>
  );
};

export default FavoritesComponent;
