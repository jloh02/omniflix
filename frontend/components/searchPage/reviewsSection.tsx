"use client";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewForm from "@/components/reviews/ReviewForm";
import { MediaType } from "@/utils/constants";
import addReview from "@/utils/database/reviews/addReview";
import deleteReview from "@/utils/database/reviews/deleteReview";
import getReviews from "@/utils/database/reviews/getReviews";
import updateReview from "@/utils/database/reviews/updateReview";
import { createClient } from "@/utils/supabase/client";
import IReview from "@/utils/types/IReview";
import { Add, Delete, Edit, Star } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const ALL_RATING_VALUE = "0";

interface ReviewsSectionProps {
  mediaType: MediaType;
  mediaId: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  mediaType,
  mediaId,
}) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [userReview, setUserReview] = useState<IReview | null>(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // States for "Submit Review" success and error snackbars
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState("");
  const [showErrorSnackbar, setShowErrorSnackbar] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");

  // Review filter states
  const [filterRating, setFilterRating] = useState([ALL_RATING_VALUE]);

  const handleCloseSuccessSnackbar = () => {
    setShowSuccessSnackbar(false);
  };

  const handleCloseErrorSnackbar = () => {
    setShowErrorSnackbar(false);
  };

  const SuccessSnackbar: React.FC = () => {
    return (
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnackbar}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successSnackbarMessage}
        </Alert>
      </Snackbar>
    );
  };

  const ErrorSnackbar: React.FC = () => {
    return (
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
    );
  };

  const handleDeleteReview = async () => {
    const error = await deleteReview(mediaType, mediaId);
    if (error) {
      // Display error snackbar
      setErrorSnackbarMessage(error.message);
      setShowErrorSnackbar(true);
    } else {
      // Display success snackbar
      setSuccessSnackbarMessage("Review deleted successfully!");
      setShowSuccessSnackbar(true);
    }

    // Close the confirmation dialog
    setShowDeleteConfirm(false);

    // Toggle state to trigger reload
    setReviewSubmitted((prev) => !prev);
  };

  const DeleteConfirmDialog: React.FC = () => {
    return (
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your review?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="info" onClick={handleDeleteReview} autoFocus>
            Confirm
          </Button>
          <Button color="info" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleSubmitReview = async (
    rating: number,
    title: string,
    description: string,
  ) => {
    let error;
    if (userReview) {
      error = await updateReview(
        mediaType,
        mediaId,
        rating,
        title,
        description,
      );
    } else {
      error = await addReview(mediaType, mediaId, rating, title, description);
    }

    if (error) {
      setErrorSnackbarMessage(error.message);
      setShowErrorSnackbar(true);
    } else {
      setSuccessSnackbarMessage("Review submitted successfully!");
      setShowSuccessSnackbar(true);
      setShowReviewForm(!showReviewForm);
    }

    // Toggle state to trigger reload
    setReviewSubmitted((prev) => !prev);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews(mediaType, mediaId);
        setReviews(fetchedReviews);

        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        const currentUserId = user?.id;

        // Filter for review by current user
        const currentUserReview = fetchedReviews.filter(
          (review) => review.userId === currentUserId,
        )[0];

        setUserReview(currentUserReview);
      } catch (error) {
        setShowErrorSnackbar(true);
        setErrorSnackbarMessage(
          (error as Error).message || "Failed to fetch reviews",
        );
      }
    };

    fetchReviews();
  }, [mediaType, mediaId, reviewSubmitted]);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === "#edit") {
        setShowReviewForm(true);
      } else {
        setShowReviewForm(false);
      }
    };

    // Check the hash initially in case the user navigates directly with it
    checkHash();

    // Listen for hash changes
    window.addEventListener("hashchange", checkHash, false);

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", checkHash, false);
    };
  }, []);

  return (
    <>
      <Box marginX={2} marginBottom={2} paddingX={2} flexDirection="column">
        <Box display="flex" justifyContent="start" marginBottom={2} gap={1}>
          <Typography flex={1} variant="h5">
            Reviews
          </Typography>
          {!userReview && !showReviewForm && (
            <Button
              startIcon={<Add />}
              color="info"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              Add Review
            </Button>
          )}
        </Box>
        {showReviewForm && (
          <ReviewForm
            reviewData={showReviewForm && userReview ? userReview : null}
            handleSubmit={handleSubmitReview}
            handleClose={() => setShowReviewForm(false)}
          />
        )}
        {userReview && !showReviewForm && (
          <Box>
            <Box display="flex" justifyContent="start">
              <Typography variant="h6" flex={1}>
                Your Review
              </Typography>
              <Button
                startIcon={<Edit />}
                color="info"
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                Edit Review
              </Button>
              <Button
                startIcon={<Delete />}
                color="error"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Review
              </Button>
            </Box>
            <ReviewCard
              key={userReview.userId}
              title={userReview.title}
              rating={userReview.rating}
              username={userReview.username}
              datetime={userReview.createdAt}
              description={userReview.description}
            />
          </Box>
        )}
        {userReview && (
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography flex={1} variant="h6">
              All Reviews
            </Typography>
            {/* Button group for rating filters */}
            {reviews.length && (
              <ToggleButtonGroup
                value={filterRating}
                onChange={(_, value) => {
                  // If no value is selected or "All" is selected, show all reviews
                  if (
                    value.length == 0 ||
                    value.slice(-1)[0] === ALL_RATING_VALUE
                  )
                    setFilterRating([ALL_RATING_VALUE]);
                  else
                    setFilterRating(
                      value.filter((v: string) => v !== ALL_RATING_VALUE),
                    );
                }}
              >
                <ToggleButton value={ALL_RATING_VALUE} className="px-5">
                  All
                </ToggleButton>
                {[1, 2, 3, 4, 5].map((index) => (
                  <ToggleButton value={index.toString()}>
                    {index} <Star className="ml-1" sx={{ color: "gold" }} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
          </Box>
        )}
        {!reviews.length && (
          <Typography variant="body1">No Reviews Found</Typography>
        )}
        {reviews
          .filter((review) => {
            // Filter reviews based on rating but show all reviews if no filter ("All") is selected
            if (
              filterRating.length == 1 &&
              filterRating[0] === ALL_RATING_VALUE
            )
              return true;
            return filterRating.includes(review.rating.toString());
          })
          .map((review) => (
            <ReviewCard
              key={review.userId}
              title={review.title}
              rating={review.rating}
              username={review.username}
              datetime={review.createdAt}
              description={review.description}
            />
          ))}
      </Box>
      <DeleteConfirmDialog />
      <SuccessSnackbar />
      <ErrorSnackbar />
    </>
  );
};

export default ReviewsSection;
