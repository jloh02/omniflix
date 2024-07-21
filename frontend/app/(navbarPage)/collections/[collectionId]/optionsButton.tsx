"use client";
import React, { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditCollectionDialog from "@/components/collections/EditCollectionDialog";
import { Tables } from "@/utils/supabase/types.gen";
import { TableNames } from "@/utils/constants";
import DeleteCollectionDialog from "@/components/collections/DeleteCollectionDialog";
import {
  Delete,
  DriveFileRenameOutline,
  Edit,
  PersonAdd,
  Share,
} from "@mui/icons-material";
import ShareCollectionDialog from "@/components/collections/ShareCollectionDialog";

interface OptionsButtonProps {
  collectionDetails: Tables<TableNames.COLLECTIONS>;
}

const OptionsButton: React.FC<OptionsButtonProps> = ({ collectionDetails }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShareClick = () => {
    setIsShareDialogOpen(true);
    handleClose();
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
        <MenuItem onClick={handleShareClick}>
          <ListItemIcon>
            <PersonAdd />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <DriveFileRenameOutline />
          </ListItemIcon>
          <ListItemText>Rename</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <ShareCollectionDialog
        collection={collectionDetails}
        isDialogOpen={isShareDialogOpen}
        handleCloseDialog={() => setIsShareDialogOpen(false)}
      />
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
