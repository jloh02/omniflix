"use client";
import InfoSummaryHeader from "@/components/moviePage/InfoSummaryHeader";
import getMovieDetails from "@/utils/database/movies/getMovieDetails";
import IMovieDetails from "@/utils/types/IMovieDetails";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReviewsSection from "./reviewsSection";
import { MediaType } from "@/utils/constants";

interface MoviePageProps {
  params: {
    movieId: string;
  };
}

const ErrorPage = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "30vh",
    }}
  >
    <Typography variant="h4" component="h1" gutterBottom>
      Movie Not Found
    </Typography>
    <Typography variant="body1" component="p" gutterBottom>
      The movie you're looking for could not be found.
    </Typography>
    <Button variant="contained" color="primary" href="/" sx={{ margin: 1 }}>
      Return to homepage
    </Button>
  </Box>
);

const Movie: React.FC<MoviePageProps> = ({ params }) => {
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const details = await getMovieDetails(params.movieId);
        setMovieDetails(details || null);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchMovieDetails();
  }, [params.movieId]);

  if (error) {
    return <ErrorPage />;
  }

  if (!movieDetails) {
    return <Typography sx={{ padding: 1 }}>Loading...</Typography>;
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <InfoSummaryHeader movie={movieDetails} />
      <ReviewsSection mediaType={MediaType.MOVIE} mediaId={params.movieId} />
    </Box>
  );
};

export default Movie;
