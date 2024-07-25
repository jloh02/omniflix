"use client";
import createCollection from "@/utils/database/collections/createCollection";
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
import { Router } from "next/router";
import React, { useState } from "react";

interface CreateCollectionDialogProps {
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
  onCollectionCreated?: () => void;
}

const CreateCollectionDialog: React.FC<CreateCollectionDialogProps> = ({
  isDialogOpen,
  handleCloseDialog,
  onCollectionCreated,
}) => {
  const router = useRouter();
  const [collectionName, setCollectionName] = useState("");

  const handleCreateCollection = async () => {
    const error = await createCollection(collectionName);
    if (onCollectionCreated) {
      onCollectionCreated();
    }
    router.refresh();
    handleCloseDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
      <DialogTitle display="flex" alignItems="center">
        <Box flex={1}></Box> {/* Invisible spacer */}
        <Typography variant="h6" flex={10} textAlign="center">
          New Collection
        </Typography>
        <Box flex={1} justifyContent="flex-end">
          <IconButton onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Collection Name"
          type="text"
          fullWidth
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={handleCreateCollection} color="info">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCollectionDialog;
