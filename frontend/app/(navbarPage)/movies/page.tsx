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
import React, { useEffect, useState } from "react";
import MovieCard from "./movieCard";
import useDebounce from "@/utils/hooks/useDebounce";
import {
  DEBOUNCE_DURATION_IN_MS,
  MINIMUM_SEARCH_LENGTH,
  MediaType,
} from "@/utils/constants";
import { Clear } from "@mui/icons-material";
import IMovie from "@/utils/types/IMovie";
import { objectKeysToLowerCase } from "@/utils/objectKeysToLowerCase";
import searchOmdb from "@/utils/database/movies/searchOmdb";

const Movies: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<IMovie[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchInputDebounced = useDebounce(
    searchInput,
    DEBOUNCE_DURATION_IN_MS,
  );

  useEffect(() => {
    setSearchResult([]);
    setError("");

    if (searchInput.length < MINIMUM_SEARCH_LENGTH) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  }, [searchInput]);

  useEffect(() => {
    if (searchInputDebounced.length < MINIMUM_SEARCH_LENGTH) return;

    searchOmdb(MediaType.MOVIE, searchInput).then(async (response) => {
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
          (movie: object) => objectKeysToLowerCase(movie) as IMovie,
        ),
      );
      setIsLoading(false);
    });
  }, [searchInputDebounced]);

  return (
    <Box sx={{ width: "90%", padding: "10px" }}>
      <Typography align="left" variant="h4" className="my-4">
        Movies
      </Typography>
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
        className="w-full mb-8"
        placeholder="Search"
        variant="outlined"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : searchResult.length && !error.length ? (
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          {searchResult.map((movie, idx) => (
            <Grid key={idx} item>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="error">{error}</Typography>
      )}
    </Box>
  );
};

export default Movies;
