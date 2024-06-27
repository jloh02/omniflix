"use client";

import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import React, { useEffect, useMemo, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import {
  DEBOUNCE_DURATION_IN_MS,
  MINIMUM_SEARCH_LENGTH,
  MediaType,
  MediaTypeToParam,
} from "@/utils/constants";
import { Clear } from "@mui/icons-material";
import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import searchOmdb from "@/utils/database/movies/searchOmdb";
import { objectKeysSnakeCaseToCamelCase } from "@/utils/objectKeysSnakeCaseToCamelCase";
import MovieTvSeriesCard from "../cards/MovieTvSeriesCard";

interface OmdbPageProps {
  title: string;
  type: MediaType;
}

const OmdbPage: React.FC<OmdbPageProps> = ({ title, type }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<IMovieTvSeries[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchInputDebounced = useDebounce(
    searchInput,
    DEBOUNCE_DURATION_IN_MS,
  );

  // Handle search event
  useEffect(() => {
    setSearchResult([]);
    setError("");

    if (searchInput.length < MINIMUM_SEARCH_LENGTH) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  }, [searchInput]);

  const { omdbType } = useMemo(() => MediaTypeToParam[type], [type]);

  // Handle search
  useEffect(() => {
    if (searchInputDebounced.length < MINIMUM_SEARCH_LENGTH) return;

    searchOmdb(searchInput, omdbType).then(async (response) => {
      if (response["Error"]) {
        setError(response["Error"]);
        setIsLoading(false);
        return;
      }

      if (!response["Search"]) {
        setError("No results found");
        setIsLoading(false);
        return;
      }

      setSearchResult(
        (response["Search"] as object[]).map(
          (mediaObj: object) =>
            objectKeysSnakeCaseToCamelCase(mediaObj) as IMovieTvSeries,
        ),
      );
      setIsLoading(false);
    });
  }, [searchInputDebounced]);

  return (
    <Box sx={{ width: "90%", padding: "10px" }}>
      <Typography align="left" variant="h4" className="!my-4">
        {title}
      </Typography>

      {/* Search bar */}
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchInput("")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className="w-full !mb-8"
        placeholder="Search"
        variant="outlined"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : searchResult.length && !error.length ? (
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          {searchResult.map((media, idx) => (
            <Grid key={idx} item>
              <MovieTvSeriesCard media={media} type={type} showLabel={false} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="error">{error}</Typography>
      )}
    </Box>
  );
};

export default OmdbPage;
