import { Box, Typography } from "@mui/material";
import MovieCard from "./moviesCard";

export default async function Index() {
  return (
    <Box sx={{ width: "90%", padding: "10px" }}>
      <Typography align="left" variant="h4">
        Movies
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>Page in development.</Typography>
      <MovieCard
        title="Pokémon: Lucario and the Mystery of Mew"
        posterUrl="https://m.media-amazon.com/images/M/MV5BMTUxOTcwNjAwMl5BMl5BanBnXkFtZTgwMjc2MzQ2NjE@._V1_.jpg"
      />
    </Box>
  );
}
