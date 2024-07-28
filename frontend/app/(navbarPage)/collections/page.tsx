import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import UserPageTemplate from "@/components/userPages/UserPageTemplate";
import { Tables } from "@/utils/supabase/types.gen";
import getUserCollections from "@/utils/database/collections/getUserCollections";
import { Folder } from "@mui/icons-material";
import { COLLECTIONS_ROUTE, TableNames } from "@/utils/constants";
import CreateCollectionButton from "@/components/collections/CreateCollectionButton";
import Link from "next/link";

const UserCollections: React.FC = async () => {
  let collections: Tables<TableNames.COLLECTIONS>[] = [];
  let collectionsSection;

  try {
    const { data, error } = (await getUserCollections()) ?? {
      data: null,
      error: null,
    };

    if (error) {
      throw error;
    }

    collections = data ?? [];
  } catch (error) {
    collectionsSection = (
      <Typography>
        An error occurred while fetching collections.
        {(error as Error).toString()}
      </Typography>
    );
  }

  if (collections.length === 0) {
    collectionsSection = <Typography>No collections found.</Typography>;
  } else {
    collectionsSection = (
      <Grid container spacing={2}>
        {collections.map((collection) => (
          <Grid item xs={12} sm={6} md={4} key={collection.id}>
            <Card style={{ marginBottom: "10px" }}>
              <Link href={`${COLLECTIONS_ROUTE}/${collection.id}`}>
                <CardContent sx={{ display: "flex", gap: "8px" }}>
                  <Folder />
                  <Typography>{collection.name}</Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <UserPageTemplate>
      <Box display="flex" justifyContent="start" marginBottom={2} gap={1}>
        <Typography flex={1} variant="h5">
          Collections
        </Typography>
        <CreateCollectionButton />
      </Box>
      {collectionsSection}
    </UserPageTemplate>
  );
};

export default UserCollections;
