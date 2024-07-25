"use client";
import deleteCollection from "@/utils/database/collections/deleteCollection";
import updateCollectionDetails from "@/utils/database/collections/updateCollectionDetails";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface DeleteCollectionDialogProps {
  collectionId: number;
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

const DeleteCollectionDialog: React.FC<DeleteCollectionDialogProps> = ({
  collectionId,
  isDialogOpen,
  handleCloseDialog,
}) => {
  const router = useRouter();

  const handleDeleteCollection = async () => {
    const error = await deleteCollection(collectionId);
    router.refresh();
    handleCloseDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle display="flex" alignItems="center">
        <Box flex={1}></Box> {/* Invisible spacer */}
        <Typography variant="h6" flex={10} textAlign="center">
          Delete Collection?
        </Typography>
        <Box flex={1} justifyContent="flex-end">
          <IconButton onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this collection?
        </Typography>
        <Typography>This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleDeleteCollection} color="error">
          Delete
        </Button>
        <Button onClick={handleCloseDialog} color="info">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCollectionDialog;
