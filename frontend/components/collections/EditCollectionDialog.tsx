"use client";
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

interface EditCollectionDialogProps {
  collectionId: number;
  collectionName: string;
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

const EditCollectionDialog: React.FC<EditCollectionDialogProps> = ({
  collectionId,
  collectionName: currentName,
  isDialogOpen,
  handleCloseDialog,
}) => {
  const router = useRouter();
  const [collectionName, setCollectionName] = useState(currentName);

  const handleEditCollection = async () => {
    const error = await updateCollectionDetails(collectionId, collectionName);
    router.refresh();
    handleCloseDialog();
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
      <DialogTitle display="flex" alignItems="center">
        <Box flex={1}></Box> {/* Invisible spacer */}
        <Typography variant="h6" flex={10} textAlign="center">
          Edit Collection
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
        <Button onClick={handleEditCollection} color="info">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCollectionDialog;
