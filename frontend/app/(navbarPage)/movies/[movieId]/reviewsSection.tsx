"use client";
import InfoSummaryHeader from "@/components/moviePage/InfoSummaryHeader";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import { MediaType } from "@/utils/constants";
import getMovieDetails from "@/utils/database/movies/getMovieDetails";
import IMovieDetails from "@/utils/types/IMovieDetails";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface ReviewsSectionProps {
  mediaType: MediaType;
  mediaId: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  mediaType,
  mediaId,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddReviewClick = () => {
    setShowReviewForm(!showReviewForm);
  };
  // const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);
  // const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   const fetchMovieDetails = async () => {
  //     try {
  //       const details = await getMovieDetails(params.movieId);
  //       setMovieDetails(details || null);
  //     } catch (err) {
  //       setError(err as Error);
  //     }
  //   };

  //   fetchMovieDetails();
  // }, [params.movieId]);

  // if (error) {
  //   return (
  //     <Typography>Error loading reviews. Please try again later!</Typography>
  //   );
  // }

  // if (!movieDetails) {
  //   return <Typography sx={{ padding: 1 }}>Loading reviews...</Typography>;
  // }

  return (
    <Box
      maxWidth="1000px"
      marginX={2}
      marginBottom={2}
      paddingX={2}
      flexDirection="column"
    >
      <Box display="flex" justifyContent="start" marginBottom={2}>
        <Typography flex={1} variant="h5">
          Reviews
        </Typography>
        <Button
          startIcon={<Add />}
          color="info"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          Add review
        </Button>
      </Box>
      {showReviewForm && (
        <ReviewForm
          handleSubmit={() => {}}
          handleClose={() => setShowReviewForm(false)}
        />
      )}
      <ReviewCard
        title="Review Title"
        rating={4}
        username="John Doe"
        datetime="2021-12-31"
        description="This is a review description"
      />
      {/* {movieDetails.reviews.map((review) => (
        <ReviewCard
          key={review.id}
          title={review.title}
          rating={review.rating}
          username={review.username}
          datetime={review.datetime}
          description={review.description}
        />
      ))} */}
    </Box>
  );
};

export default ReviewsSection;
