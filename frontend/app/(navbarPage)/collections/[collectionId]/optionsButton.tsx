"use client";
import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditCollectionDialog from "@/components/collections/EditCollectionDialog";
import { Tables } from "@/utils/supabase/types.gen";
import { TableNames } from "@/utils/constants";
import DeleteCollectionDialog from "@/components/collections/DeleteCollectionDialog";

interface OptionsButtonProps {
  collectionDetails: Tables<TableNames.COLLECTIONS>;
}

const OptionsButton: React.FC<OptionsButtonProps> = ({ collectionDetails }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
    handleClose();
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem onClick={handleEditClick}>Edit collection</MenuItem>
        <MenuItem onClick={handleDeleteClick}>Delete collection</MenuItem>
      </Menu>
      <EditCollectionDialog
        collectionId={collectionDetails.id}
        collectionName={collectionDetails.name}
        isDialogOpen={isEditDialogOpen}
        handleCloseDialog={() => setIsEditDialogOpen(false)}
      />
      <DeleteCollectionDialog
        collectionId={collectionDetails.id}
        isDialogOpen={isDeleteDialogOpen}
        handleCloseDialog={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
};

export default OptionsButton;
