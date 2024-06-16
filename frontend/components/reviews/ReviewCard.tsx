import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Box,
} from "@mui/material";

interface ReviewCardProps {
  title: string;
  rating: number;
  username: string;
  datetime: string;
  description: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  rating,
  username,
  datetime,
  description,
}) => {
  return (
    <Card raised sx={{ marginY: 2, backgroundColor: "transparent" }}>
      <CardContent>
        <Box display="flex" alignItems="center" marginBottom={1}>
          <Avatar />
          <Box style={{ marginLeft: 16 }}>
            <Typography variant="h6">{title}</Typography>
            <Rating value={rating} readOnly />
            <Typography variant="body2">
              Written by {username} on {datetime}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1">{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
