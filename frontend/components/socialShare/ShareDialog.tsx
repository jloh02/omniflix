"use client";
import React from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  CopyLinkIconButton,
  FacebookIconButton,
  LinkedInIconButton,
  MailIconButton,
  NativeShareIconButton,
  RedditIconButton,
  TelegramIconButton,
  WhatsAppIcon,
  XTwitterIcon,
} from "./ShareDialogIconButton";

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  text: string;
  link: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  onClose,
  text,
  link,
}) => {
  const shareDialogIconButtonList: JSX.Element[] = [
    <CopyLinkIconButton text={text} link={link} />,
    <NativeShareIconButton text={text} link={link} />,
    <MailIconButton text={text} link={link} />,
    <WhatsAppIcon text={text} link={link} />,
    <TelegramIconButton text={text} link={link} />,
    <FacebookIconButton text={text} link={link} />,
    <XTwitterIcon text={text} link={link} />,
    <LinkedInIconButton text={text} link={link} />,
    <RedditIconButton text={text} link={link} />,
    // Add more share options as needed
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Share
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          {shareDialogIconButtonList.map((shareDialogIconButton, index) => (
            <Grid item xs={4} sm={3} md={2} key={index}>
              {shareDialogIconButton}
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
