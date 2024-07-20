"use server";
import getCollectionDetails from "@/utils/database/collections/getCollectionDetails";
import getCollectionItems from "@/utils/database/collections/getCollectionItems";
import { AppBar, Box, Typography } from "@mui/material";
import OptionsButton from "./optionsButton";

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
      <Typography>{collectionItems?.length}</Typography>
    </Box>
  );
};

export default CollectionPage;
