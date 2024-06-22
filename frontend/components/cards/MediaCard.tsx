import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { MOVIES_PAGE_ROUTE, MediaType } from "@/utils/constants";
import FavoriteButton from "./FavoriteButton";
import AddToWatchlistButton from "./AddToWatchlistButton";
import LikeDislikeButtons from "./LikeDislikeButtons";
import Link from "next/link";

type MediaCardProps = {
  mediaType: MediaType;
  mediaId: string;
  posterUrl: string;
  title: string;
  subtitle: string;
  showLabel?: boolean;
};

const MediaCard: React.FC<MediaCardProps> = ({
  mediaType,
  mediaId,
  posterUrl,
  title,
  subtitle,
  showLabel = true,
}) => {
  let mediaPagePath;
  switch (mediaType) {
    case MediaType.MOVIE:
      mediaPagePath = MOVIES_PAGE_ROUTE;
      break;
  }
  mediaPagePath += `/${mediaId}`;

  return (
    <Card className="relative w-52 h-full">
      <Link href={mediaPagePath}>
        <CardMedia component="img" src={posterUrl} className="h-72" />
      </Link>
      <CardContent className="p-2.5 last:pb-8">
        <Box display="flex" justifyContent="space-between" className="mb-2">
          <Box display="flex" gap={1}>
            <FavoriteButton mediaType={mediaType} mediaId={mediaId} />
            <AddToWatchlistButton mediaType={mediaType} mediaId={mediaId} />
          </Box>
          {showLabel ? (
            <Chip
              label="Movie"
              sx={{
                color: "white",
                backgroundColor: (theme) => theme.palette.primary.light,
              }}
            />
          ) : null}
        </Box>
        <Typography
          variant="body1"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2">{subtitle}</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={1}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <LikeDislikeButtons mediaType={mediaType} mediaId={mediaId} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
