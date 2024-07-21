"use server";
import getCollectionDetails from "@/utils/database/collections/getCollectionDetails";
import getCollectionItems from "@/utils/database/collections/getCollectionItems";
import { AppBar, Box, Grid, Typography } from "@mui/material";
import OptionsButton from "./optionsButton";
import MovieTvSeriesCard from "@/components/cards/MovieTvSeriesCard";

interface CollectionPageProps {
  params: {
    collectionId: string;
  };
}

const CollectionPage: React.FC<CollectionPageProps> = async ({ params }) => {
  const { data: collectionDetails, error: collectionDetailsError } =
    (await getCollectionDetails(params.collectionId)) ?? {
      data: null,
      error: null,
    };
  const collectionItems = await getCollectionItems(
    parseInt(params.collectionId),
  );

  if (
    collectionDetails == null ||
    collectionDetailsError ||
    collectionItems == undefined
  ) {
    return <Typography>Collection not found</Typography>;
  }

  return (
    <Box width="100%" paddingX={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{collectionDetails.name}</Typography>
        <OptionsButton collectionDetails={collectionDetails} />
      </Box>
      {collectionItems.length > 0 ? (
        <Grid container spacing={3} className="mt-0 items-stretch">
          {collectionItems.map((media, index) => (
            <Grid key={index} item>
              <MovieTvSeriesCard media={media} type={media.mediaType} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" className="mt-4">
          No items found.
        </Typography>
      )}
    </Box>
  );
};

export default CollectionPage;
