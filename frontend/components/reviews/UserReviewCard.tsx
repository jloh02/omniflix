"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Collapse,
  CardMedia,
  Button,
  CardActionArea,
} from "@mui/material";
import { MOVIES_PAGE_ROUTE, MediaType } from "@/utils/constants";
import { ArrowDropDown, Edit, Star } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserReviewCardProps {
  mediaType: MediaType;
  mediaId: number;
  poster: string;
  mediaTitle: string;
  rating: number;
  datetime: string;
  reviewTitle: string;
  reviewDescription: string;
}

const UserReviewCard: React.FC<UserReviewCardProps> = ({
  mediaType,
  mediaId,
  poster,
  mediaTitle,
  rating,
  datetime,
  reviewTitle,
  reviewDescription,
}) => {
  const [expanded, setExpanded] = useState(false);
  const mediaPagePath = MOVIES_PAGE_ROUTE + "/" + mediaId;

  // Initialize router
  const router = useRouter();

  function toTitleCase(str: string) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }

  return (
    <Box onClick={() => setExpanded(!expanded)}>
      <Card
        raised
        sx={{
          marginY: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "primary",
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box display="flex">
            <Link href={mediaPagePath}>
              <CardMedia
                component="img"
                image={poster}
                alt={mediaTitle}
                sx={{ height: 100, width: "auto", objectFit: "contain", mr: 2 }}
              />
            </Link>
            <Box width="100%" position="relative">
              <Chip
                label={toTitleCase(mediaType)}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  color: "white",
                  backgroundColor: (theme) => theme.palette.primary.light,
                }}
              />
              <Typography variant="h6">{mediaTitle}</Typography>
              <Typography variant="body2">
                Rated {rating}{" "}
                <Star sx={{ fontSize: "inherit", verticalAlign: "middle" }} />{" "}
                on {datetime}
              </Typography>
              <Button
                startIcon={<Edit />}
                color="info"
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(`${mediaPagePath}#edit`);
                }}
              >
                Edit Review
              </Button>
              <IconButton
                onClick={() => setExpanded(!expanded)}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              >
                <ArrowDropDown />
              </IconButton>
            </Box>
          </Box>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="h6">
                {reviewTitle}
              </Typography>
              <Typography variant="body2">{reviewDescription}</Typography>
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserReviewCard;
