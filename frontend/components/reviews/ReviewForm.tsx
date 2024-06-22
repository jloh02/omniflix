import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Rating,
  FormHelperText,
} from "@mui/material";
import IReview from "@/utils/types/IReview";

interface ReviewFormProps {
  reviewData: IReview | null;
  handleSubmit: (rating: number, title: string, description: string) => void;
  handleClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  reviewData,
  handleSubmit,
  handleClose,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // States for error messages
  const [ratingError, setRatingError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const validateRating = (newValue: number | null) => {
    // Reset error message
    setRatingError("");

    if (!newValue) {
      setRatingError("Rating is required.");
      return false;
    }

    return true;
  };

  const validateTitle = (newTitle: string) => {
    // Reset error message
    setTitleError("");

    if (newTitle.trim() === "") {
      setTitleError("Title is required.");
      return false;
    }

    return true;
  };

  const validateDescription = (newDescription: string) => {
    // Reset error message
    setDescriptionError("");

    if (newDescription.trim() === "") {
      setDescriptionError("Description is required.");
      return false;
    }

    return true;
  };

  const validateForm = () => {
    const isValidRating = validateRating(rating);
    const isValidTitle = validateTitle(title);
    const isValidDescription = validateDescription(description);

    return isValidRating && isValidTitle && isValidDescription;
  };

  // Populate form fields when reviewData changes
  useEffect(() => {
    if (reviewData) {
      setTitle(reviewData.title);
      setRating(reviewData.rating);
      setDescription(reviewData.description);
    }
  }, [reviewData]);

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (validateForm()) {
          handleSubmit(rating ?? 0, title, description);
        }
      }}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography variant="h6" marginBottom={2}>
        Add a Review
      </Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
          validateRating(newValue);
        }}
      />
      {ratingError && (
        <FormHelperText error={true}>{ratingError}</FormHelperText>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        color="secondary"
        label="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          validateTitle(e.target.value);
        }}
        error={Boolean(titleError)}
        helperText={titleError}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        minRows={4}
        color="secondary"
        label="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          validateDescription(e.target.value);
        }}
        error={Boolean(descriptionError)}
        helperText={descriptionError}
      />
      <Box marginTop={2} marginBottom={4} display="flex" gap={1}>
        <Button type="submit" variant="outlined" color="secondary">
          Submit Review
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewForm;
