"use client";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import { MediaType } from "@/utils/constants";
import addReview from "@/utils/database/reviews/addReview";
import { Add } from "@mui/icons-material";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";

interface ReviewsSectionProps {
  mediaType: MediaType;
  mediaId: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  mediaType,
  mediaId,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");

  const handleCloseErrorSnackbar = () => {
    setShowErrorSnackbar(false);
  };

  const handleAddReview = async (
    rating: number,
    title: string,
    description: string,
  ) => {
    const error = await addReview(
      mediaType,
      mediaId,
      rating,
      title,
      description,
    );

    if (error) {
      setErrorSnackbarMessage(error.message);
      setShowErrorSnackbar(true);
    } else {
      setShowReviewForm(!showReviewForm);
    }
  };

  return (
    <>
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
            handleSubmit={handleAddReview}
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
      <Snackbar
        open={showErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorSnackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewsSection;
