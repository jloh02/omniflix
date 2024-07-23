"use client";
import InfoSummaryHeader from "@/components/moviePage/InfoSummaryHeader";
import getOmdbDetails from "@/utils/database/omdb/omdbDetails";
import IMovieTvSeriesDetails from "@/utils/types/IMovieTvSeriesDetails";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReviewsSection from "./reviewsSection";
import {
  HOME_PAGE_ROUTE,
  MediaType,
  MediaTypeToParam,
} from "@/utils/constants";

interface MoviePageProps {
  mediaId: number;
  mediaType: MediaType;
  errorHeader: string;
  errorBody: string;
}

const ErrorPage: React.FC<{ header: string; body: string }> = ({
  header,
  body,
}) => (
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
      {header}
    </Typography>
    <Typography variant="body1" component="p" gutterBottom>
      {body}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      href={HOME_PAGE_ROUTE}
      sx={{ margin: 1 }}
    >
      Return to homepage
    </Button>
  </Box>
);

const OmdbPageDetails: React.FC<MoviePageProps> = ({
  mediaId,
  mediaType,
  errorHeader,
  errorBody,
}) => {
  const [mediaDetails, setMediaDetails] =
    useState<IMovieTvSeriesDetails | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { omdbType } = MediaTypeToParam[mediaType];

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getOmdbDetails(mediaId, omdbType);
        setMediaDetails(details || null);
      } catch (err) {
        setError(err as Error);
      }
    };

    fetchDetails();
  }, [mediaId]);

  if (error) {
    return <ErrorPage header={errorHeader} body={errorBody} />;
  }

  if (!mediaDetails) {
    return <Typography sx={{ padding: 1 }}>Loading...</Typography>;
  }

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <InfoSummaryHeader media={mediaDetails} mediaType={mediaType} />
      <ReviewsSection mediaType={mediaType} mediaId={mediaId} />
    </Box>
  );
};

export default OmdbPageDetails;
