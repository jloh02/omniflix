"use client";
import createCollection from "@/utils/database/collections/createCollection";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import CreateCollectionButton from "./CreateCollectionButton";
import getUserCollections from "@/utils/database/collections/getUserCollections";
import { Tables } from "@/utils/supabase/types.gen";
import { TableNames } from "@/utils/constants";

interface AddToCollectionDialogProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

const AddToCollectionDialog: React.FC<AddToCollectionDialogProps> = ({
  isDialogOpen,
  handleCloseDialog,
}) => {
  const [collections, setCollections] = useState<
    Tables<TableNames.COLLECTIONS>[]
  >([]);

  const fetchUserCollections = useCallback(async () => {
    const userCollections = await getUserCollections();
    setCollections(userCollections?.data ?? []); // TODO: handle error
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      fetchUserCollections();
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
        <List>
          {collections.map((collection) => (
            <ListItem key={collection.id}>{collection.name}</ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCollectionDialog;
