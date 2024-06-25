"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, Button } from "@mui/material";
import { Reply } from "@mui/icons-material";
import ShareDialog from "./ShareDialog";

interface ShareButtonProps {
  text: string;
  link?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ text, link }) => {
  const [open, setOpen] = useState(false);
  const [shareLink, setComputedLink] = useState("");

  const toggleDialog = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // This runs on the client side, where window is defined
    setComputedLink(link ?? window.location.href);
  }, [link]);

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
        link={shareLink}
      />
    </>
  );
};

export default ShareButton;
