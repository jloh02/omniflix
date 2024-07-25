"use server";
import getCollectionDetails from "@/utils/database/collections/getCollectionDetails";
import getCollectionItems from "@/utils/database/collections/getCollectionItems";
import { Box, Grid, Typography } from "@mui/material";
import OptionsButton from "./optionsButton";
import MediaCard from "@/components/cards/MediaCard";
import { createClient } from "@/utils/supabase/server";
import ShareIconButton from "@/components/socialShare/ShareIconButton";

interface CollectionPageProps {
  params: {
    collectionId: string;
  };
}

const CollectionPage: React.FC<CollectionPageProps> = async ({ params }) => {
  // Fetch current user
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
        <Box display="flex" gap={2}>
          <Typography variant="h6">{collectionDetails.name}</Typography>
          <ShareIconButton
            text={`Check out this collection (${collectionDetails.name}) on Omniflix!`}
          />
        </Box>
        {user?.id === collectionDetails.owner_id && (
          <OptionsButton collectionDetails={collectionDetails} />
        )}
      </Box>
      {collectionItems.length > 0 ? (
        <Grid container spacing={3} className="mt-0 items-stretch">
          {collectionItems.map((media, index) => (
            <Grid key={index} item>
              <MediaCard media={media} mediaType={media.mediaType} />
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
