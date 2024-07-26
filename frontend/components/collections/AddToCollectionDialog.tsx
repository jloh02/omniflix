"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import CreateCollectionButton from "./CreateCollectionButton";
import getUserCollections from "@/utils/database/collections/getUserCollections";
import { Tables } from "@/utils/supabase/types.gen";
import { TableNames } from "@/utils/constants";
import removeCollectionItem from "@/utils/database/collections/removeCollectionItem";
import addCollectionItem from "@/utils/database/collections/addCollectionItem";
import { AddCircleOutline, CheckCircle } from "@mui/icons-material";
import getUserCollectionsContainingItem from "@/utils/database/collections/getUserCollectionsContainingItem";

interface CollectionListItemProps {
  collection: Tables<TableNames.COLLECTIONS>;
  mediaId: number;
  isItemInCollection: boolean;
}

const CollectionListItem: React.FC<CollectionListItemProps> = ({
  collection,
  mediaId,
  isItemInCollection: isItemInCollectionInitial,
}) => {
  const [isItemInCollection, setIsItemInCollection] = useState<boolean>(
    isItemInCollectionInitial,
  );

  const toggleItemInCollection = useCallback(async () => {
    let error;
    if (isItemInCollection) {
      // Remove item from collection
      error = await removeCollectionItem(collection.id, mediaId);
    } else {
      // Add item to collection
      error = await addCollectionItem(collection.id, mediaId);
    }

    if (error) {
      console.error(error);
      return;
    }

    setIsItemInCollection(!isItemInCollection);
  }, [isItemInCollection, setIsItemInCollection]);

  return (
    <ListItemButton onClick={toggleItemInCollection}>
      <ListItemText primary={collection.name} />
      <Tooltip
        title={
          isItemInCollection ? "Remove from collection" : "Add to collection"
        }
      >
        {isItemInCollection ? <CheckCircle /> : <AddCircleOutline />}
      </Tooltip>
    </ListItemButton>
  );
};

interface AddToCollectionDialogProps {
  mediaId: number;
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

const AddToCollectionDialog: React.FC<AddToCollectionDialogProps> = ({
  mediaId,
  isDialogOpen,
  handleCloseDialog,
}) => {
  const [collections, setCollections] = useState<
    Tables<TableNames.COLLECTIONS>[]
  >([]);
  const [savedToCollections, setSavedToCollections] = useState<
    Tables<TableNames.COLLECTIONS>[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserCollections = useCallback(async () => {
    const userCollections = await getUserCollections();
    setCollections(userCollections?.data ?? []); // TODO: handle error
  }, []);

  const fetchSavedToCollection = useCallback(async () => {
    const collections = await getUserCollectionsContainingItem(mediaId);
    setSavedToCollections(collections?.data ?? []); // TODO: handle error
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      Promise.all([fetchUserCollections(), fetchSavedToCollection()]).then(() =>
        setIsLoading(false),
      );
    }
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
      <DialogTitle
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" textAlign="center">
          Collections
        </Typography>
        <CreateCollectionButton onCollectionCreated={fetchUserCollections} />
      </DialogTitle>
      <DialogContent>
        {!isLoading && (
          <List>
            {collections.map((collection) => (
              <CollectionListItem
                key={collection.id}
                collection={collection}
                mediaId={mediaId}
                isItemInCollection={savedToCollections.some(
                  (savedToCollection) => savedToCollection.id === collection.id,
                )}
              />
            ))}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddToCollectionDialog;
