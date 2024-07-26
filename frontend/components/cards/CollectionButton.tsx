"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import getUserCollectionsContainingItem from "@/utils/database/collections/getUserCollectionsContainingItem";
import { Tables } from "@/utils/supabase/types.gen";
import { TableNames } from "@/utils/constants";
import AddToCollectionDialog from "../collections/AddToCollectionDialog";
import isInUserCollections from "@/utils/database/collections/isInUserCollections";

interface CollectionButtonProps {
  mediaId: number;
}

const CollectionButton: React.FC<CollectionButtonProps> = ({ mediaId }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const checkEnabled = useCallback(async () => {
    const isInUserCollection = await isInUserCollections(mediaId);
    setIsEnabled(isInUserCollection);
    setIsLoading(false);
  }, [setIsEnabled, setIsLoading, mediaId]);

  useEffect(() => {
    checkEnabled();
  }, [checkEnabled]);

  return (
    <Box>
      <Tooltip title={isLoading ? "Loading..." : "Add to collection"}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
          }}
        >
          <CircularProgress
            size={20}
            color="secondary"
            sx={{
              position: "absolute",
              height: 30,
              opacity: isLoading ? 1 : 0,
            }}
          />
          <IconButton
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDialogOpen(true);
            }}
            sx={{ height: 30, width: 30, opacity: isLoading ? 0 : 1 }}
          >
            <Box
              display="flex"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                transitionDelay: "0.15s",
              }}
            >
              {isEnabled ? <Bookmark /> : <BookmarkBorder />}
            </Box>
          </IconButton>
          <AddToCollectionDialog
            mediaId={mediaId}
            isDialogOpen={isDialogOpen}
            handleCloseDialog={() => {
              setIsDialogOpen(false);
              checkEnabled();
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default CollectionButton;
