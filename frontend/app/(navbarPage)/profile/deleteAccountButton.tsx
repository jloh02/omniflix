"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import deleteAccount from "@/utils/supabase/deleteAccount";
import { useRouter } from "next/navigation";
import { HOME_PAGE_ROUTE } from "@/utils/constants";

const DeleteAccountButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await deleteAccount();
    router.push(HOME_PAGE_ROUTE);
  };

  return (
    <Box margin={1}>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Delete Account
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Confirm Account Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="info" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete My Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteAccountButton;
