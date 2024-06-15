import React, { useState } from "react";
import { TextField, Button, Typography, Box, Rating } from "@mui/material";

interface ReviewFormProps {
  handleSubmit: () => void;
  handleClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  handleSubmit,
  handleClose,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" marginBottom={2}>
        Add a Review
      </Typography>
      <Rating
        name="rating"
        value={rating}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        color="secondary"
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        color="secondary"
        name="description"
        label="Description"
        type="text"
        id="description"
        multiline
        minRows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
