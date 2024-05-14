"use client";

import { Box, Grid, IconButton, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import MovieCard from "./moviesCard";
import useDebounce from "@/utils/hooks/useDebounce";
import {
  DEBOUNCE_DURATION_IN_MS,
  MINIMUM_SEARCH_LENGTH,
} from "@/utils/constants";
import { Clear } from "@mui/icons-material";
import IMovie from "@/utils/types/IMovie";
import { objectKeysToLowerCase } from "@/utils/objectKeysToLowerCase";

const Movies: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchInputDebounced = useDebounce(
    searchInput,
    DEBOUNCE_DURATION_IN_MS,
  );

  useEffect(() => {
    setSearchResult([]);

    if (searchInput.length < MINIMUM_SEARCH_LENGTH) return;

    setIsLoading(true);
  }, [searchInput]);

  useEffect(() => {
    if (searchInputDebounced.length < MINIMUM_SEARCH_LENGTH) return;

    fetch(`/api/v1/omdb?query=${searchInput}&type=movie`).then(
      async (response) => {
        // setSearchResult(JSON.stringify(await response.json())),
        const responseJson = JSON.parse(
          `{"Search":[{"Title":"John Wick","Year":"2014","imdbID":"tt2911666","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg"},{"Title":"John Wick: Chapter 2","Year":"2017","imdbID":"tt4425200","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjE2NDkxNTY2M15BMl5BanBnXkFtZTgwMDc2NzE0MTI@._V1_SX300.jpg"},{"Title":"John Wick: Chapter 3 - Parabellum","Year":"2019","imdbID":"tt6146586","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SX300.jpg"},{"Title":"Being John Malkovich","Year":"1999","imdbID":"tt0120601","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTFlYjgyMjUtNmJhZS00MDY2LTg0ZmMtNTVlNDA2NTUwYTRjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg"},{"Title":"John Wick: Chapter 4","Year":"2023","imdbID":"tt10366206","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg"},{"Title":"John Carter","Year":"2012","imdbID":"tt0401729","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDEwZmIzNjYtNjUwNS00MzgzLWJiOGYtZWMxZGQ5NDcxZjUwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"},{"Title":"Dear John","Year":"2010","imdbID":"tt0989757","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTk1NDEzMTU5NV5BMl5BanBnXkFtZTcwNTI3MTk5Mg@@._V1_SX300.jpg"},{"Title":"John Q","Year":"2002","imdbID":"tt0251160","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTcxNTQ1MzAyOF5BMl5BanBnXkFtZTYwNDg0ODk4._V1_SX300.jpg"},{"Title":"John Tucker Must Die","Year":"2006","imdbID":"tt0455967","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGIxZTkzMjItZDhiNy00NzA0LTg1MzMtYzFlMTc1ODQzODIzXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg"},{"Title":"John Dies at the End","Year":"2012","imdbID":"tt1783732","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTUyNzIyNzc0MV5BMl5BanBnXkFtZTcwOTM5ODg1OA@@._V1_SX300.jpg"}],"totalResults":"2356","Response":"True"}`,
        );
        setSearchResult(
          (responseJson["Search"] as object[]).map(
            (movie: object) => objectKeysToLowerCase(movie) as IMovie,
          ),
        );
        setIsLoading(false);
      },
    );
  }, [searchInputDebounced]);

  return (
    <Box sx={{ width: "90%", padding: "10px" }}>
      <Typography align="left" variant="h4">
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
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          {searchResult.map((movie) => (
            <Grid item>
              <MovieCard
                title={movie.title}
                posterUrl={movie.poster}
                year={movie.year}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Typography sx={{ fontStyle: "italic" }}>Page in development.</Typography>
      <MovieCard
        title="Pokémon: Lucario and the Mystery of Mew"
        posterUrl="https://m.media-amazon.com/images/M/MV5BMTUxOTcwNjAwMl5BMl5BanBnXkFtZTgwMjc2MzQ2NjE@._V1_.jpg"
      />
    </Box>
  );
};

export default Movies;
