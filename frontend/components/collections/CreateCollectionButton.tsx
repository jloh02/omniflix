"use client";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import CreateCollectionDialog from "./CreateCollectionDialog";

const CreateCollectionButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateCollection = (collectionName: string) => {
    // Logic to create a new collection
    console.log(`Creating collection: ${collectionName}`);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<Add />}
        color="info"
        onClick={() => setIsDialogOpen(true)}
      >
        New collection
      </Button>
      <CreateCollectionDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default CreateCollectionButton;
