"use client";

import { Box, Button, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import MovieCard from "./moviesCard";
import useDebounce from "@/utils/useDebounce";

const Movies: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const searchInputDebounced = useDebounce(searchInput, 500);

  useEffect(() => {
    fetch(`/api/v1/omdb?query=${searchInput}&type=movie`).then(
      async (response) =>
        setSearchResult(JSON.stringify(await response.json())),
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
        }}
        placeholder="Search"
        variant="outlined"
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />

      <Typography variant="body1">{searchResult}</Typography>
      <Typography sx={{ fontStyle: "italic" }}>Page in development.</Typography>
      <MovieCard
        title="Pokémon: Lucario and the Mystery of Mew"
        posterUrl="https://m.media-amazon.com/images/M/MV5BMTUxOTcwNjAwMl5BMl5BanBnXkFtZTgwMjc2MzQ2NjE@._V1_.jpg"
      />
    </Box>
  );
};

export default Movies;
