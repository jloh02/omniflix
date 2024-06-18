"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

const DeleteAccountButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    // Implement your delete logic here, e.g., call an API to delete the account
    console.log("Account deletion confirmed");
    setOpen(false);
    // Redirect or update UI as needed after deletion
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
          <Button onClick={handleDelete} color="info" autoFocus>
            Confirm
          </Button>
          <Button onClick={handleClose} color="info">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteAccountButton;
