"use client";
import { DEBOUNCE_DURATION_IN_MS, TableNames } from "@/utils/constants";
import addCollectionCollaborator from "@/utils/database/collections/addCollectionCollaborator";
import getCollectionCollaborators from "@/utils/database/collections/getCollectionCollaborators";
import removeCollectionCollaborator from "@/utils/database/collections/removeCollectionCollaborator";
import searchUserInfo from "@/utils/database/userProfile/searchUserInfo";
import useDebounce from "@/utils/hooks/useDebounce";
import { Tables } from "@/utils/supabase/types.gen";
import { Close, LinkOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface UserSearchBarProps {
  collectionId: number;
  refreshCollaborators: () => void;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({
  collectionId,
  refreshCollaborators,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<
    readonly Tables<TableNames.USERS_INFO>[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCollaborator = async (userId: string) => {
    const error = await addCollectionCollaborator(collectionId, userId);
    if (error) {
      console.error("Failed to add collaborator: ", error);
      return;
    }

    refreshCollaborators();
    setSearchInput("");
  };

  const searchInputDebounced = useDebounce(
    searchInput,
    DEBOUNCE_DURATION_IN_MS,
  );

  // Handle search event
  useEffect(() => {
    setSearchResults([]);
    setIsLoading(true);
  }, [searchInput]);

  // Handle search
  useEffect(() => {
    searchUserInfo(searchInputDebounced).then(async (response) => {
      if (response?.error) {
        setIsLoading(false);
        return;
      }

      setSearchResults(response?.data ?? []);
      setIsLoading(false);
    });
  }, [searchInputDebounced]);

  return (
    <Autocomplete
      freeSolo
      autoComplete
      includeInputInList
      filterSelectedOptions
      loading={isLoading}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.username
      }
      options={searchResults}
      noOptionsText="No user found"
      onInputChange={(event: any, value: string) => {
        setSearchInput(value);
      }}
      onChange={(event, value) => {
        if (value && typeof value !== "string") {
          handleAddCollaborator(value.user_id);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add users by username"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Box display="flex" gap={1} alignItems="center">
              <Avatar />
              <ListItemText primary={option.name} secondary={option.username} />
            </Box>
          </li>
        );
      }}
    />
  );
};

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

  const handleRemoveCollaborator = async (
    collectionId: number,
    userId: string,
  ) => {
    const error = await removeCollectionCollaborator(collectionId, userId);
    if (error) {
      console.error("Failed to add collaborator: ", error);
      return;
    }

    fetchCollectionCollaborators();
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
          <UserSearchBar
            collectionId={collection.id}
            refreshCollaborators={fetchCollectionCollaborators}
          />
          <Typography marginTop={2}>People with access</Typography>
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
                {collection.owner_id === collaborator.user_id ? (
                  <Typography>Owner</Typography>
                ) : (
                  <Tooltip title="Remove collaborator">
                    <IconButton
                      onClick={() =>
                        handleRemoveCollaborator(
                          collection.id,
                          collaborator.user_id,
                        )
                      }
                    >
                      <Close />
                    </IconButton>
                  </Tooltip>
                )}
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
