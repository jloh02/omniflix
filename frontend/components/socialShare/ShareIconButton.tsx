"use client";
import React, { useState } from "react";
import { Tooltip, Button } from "@mui/material";
import { Reply } from "@mui/icons-material";
import ShareDialog from "./ShareDialog";

interface ShareIconButtonProps {
  text: string;
  link?: string;
}

const ShareButton: React.FC<ShareIconButtonProps> = ({ text, link }) => {
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip title="Share">
        <Button
          variant="contained"
          size="small"
          onClick={toggleDialog}
          startIcon={
            <Reply
              sx={{
                transform: "scaleX(-1)",
              }}
            />
          }
          sx={{
            backgroundColor: "grey !important",
            "&:hover": {
              backgroundColor: "dimgrey !important",
            },
          }}
        >
          Share
        </Button>
      </Tooltip>
      <ShareDialog
        open={open}
        onClose={toggleDialog}
        text={text}
        link={link ?? window.location.href}
      />
    </>
  );
};

export default ShareButton;
