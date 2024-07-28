"use client";
import React, { useEffect, useState } from "react";
import { Tooltip, Button, IconButton } from "@mui/material";
import { Reply } from "@mui/icons-material";
import ShareDialog from "./ShareDialog";

interface ShareIconButtonProps {
  text: string;
  link?: string;
}

const ShareIconButton: React.FC<ShareIconButtonProps> = ({ text, link }) => {
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
      <Tooltip title="Share link">
        <IconButton size="small" onClick={toggleDialog}>
          <Reply sx={{ transform: "scaleX(-1)" }} />
        </IconButton>
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

export default ShareIconButton;
