"use client";
import { TableNames } from "@/utils/constants";
import getCollectionCollaborators from "@/utils/database/collections/getCollectionCollaborators";
import { Tables } from "@/utils/supabase/types.gen";
import { Close, LinkOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface ShareCollectionDialogProps {
  collection: Tables<TableNames.COLLECTIONS>;
  isDialogOpen: boolean;
  handleCloseDialog: () => void;
}

const ShareCollectionDialog: React.FC<ShareCollectionDialogProps> = ({
  collection,
  isDialogOpen,
  handleCloseDialog,
}) => {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [collaborators, setCollaborators] = useState<
    Tables<TableNames.USERS_INFO>[]
  >([]);

  const handleCloseShareDialog = async () => {
    router.refresh();
    handleCloseDialog();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const fetchCollectionCollaborators = useCallback(async () => {
    const collaborators = await getCollectionCollaborators(collection.id);
    setCollaborators(collaborators?.data ?? []); // TODO: Handle error
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      fetchCollectionCollaborators();
    }
  }, [isDialogOpen]);

  return (
    <>
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth>
        <DialogTitle
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6">Share '{collection.name}'</Typography>
          <IconButton onClick={handleCloseShareDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>People with access</Typography>
          <List>
            {collaborators.map((collaborator) => (
              <ListItem key={collaborator.user_id}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={collaborator.name}
                  secondary={`@${collaborator.username}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="info"
            startIcon={<LinkOutlined />}
            onClick={handleCopyLink}
          >
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default ShareCollectionDialog;
