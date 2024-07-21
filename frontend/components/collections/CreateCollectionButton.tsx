"use client";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useState } from "react";
import CreateCollectionDialog from "./CreateCollectionDialog";

interface CreateCollectionButtonProps {
  onCollectionCreated?: () => void;
}

const CreateCollectionButton: React.FC<CreateCollectionButtonProps> = ({
  onCollectionCreated,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        onCollectionCreated={onCollectionCreated}
      />
    </>
  );
};

export default CreateCollectionButton;
