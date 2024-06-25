"use client";
import React, { useState } from "react";
import { IconButton, ListItem, Typography, Snackbar } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {
  Close,
  Email,
  FacebookOutlined,
  LinkOutlined,
  LinkedIn,
  Reddit,
  Telegram,
  WhatsApp,
  X,
} from "@mui/icons-material";

interface ShareDialogIconButtonProps {
  handleShare: () => void;
  icon: JSX.Element;
  iconLabel: string;
}

const ShareDialogIconButton: React.FC<ShareDialogIconButtonProps> = ({
  handleShare,
  icon,
  iconLabel,
}) => {
  return (
    <ListItem sx={{ display: "flex", flexDirection: "column" }}>
      <IconButton onClick={handleShare}>{icon}</IconButton>
      <Typography variant="caption" whiteSpace="nowrap">
        {iconLabel}
      </Typography>
    </ListItem>
  );
};

interface ShareIconButtonProps {
  text: string;
  link: string;
}

export const CopyLinkIconButton: React.FC<ShareIconButtonProps> = ({
  link,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <ShareDialogIconButton
        handleShare={handleCopyLink}
        icon={
          <LinkOutlined
            fontSize="large"
            sx={{
              transform: "rotate(-45deg)",
            }}
          />
        }
        iconLabel="Copy link"
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message="Link copied to clipboard!"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export const NativeShareIconButton: React.FC<ShareIconButtonProps> = ({
  text,
  link,
}) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Omniflix",
        text: text,
        url: link,
      });
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<ShareIcon fontSize="large" />}
      iconLabel="Share"
    />
  );
};

export const MailIconButton: React.FC<ShareIconButtonProps> = ({
  text,
  link,
}) => {
  const handleShare = async () => {
    try {
      window.open(`mailto:?subject=${text}&body=${link}`, "_blank");
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<Email fontSize="large" />}
      iconLabel="Email"
    />
  );
};

export const FacebookIconButton: React.FC<ShareIconButtonProps> = ({
  link,
}) => {
  const handleShare = async () => {
    try {
      window.open(`https://facebook.com/sharer/sharer.php?u=${link}`, "_blank");
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<FacebookOutlined fontSize="large" />}
      iconLabel="Facebook"
    />
  );
};

export const LinkedInIconButton: React.FC<ShareIconButtonProps> = ({
  text,
  link,
}) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${link}&title=${text}&summary=${text}&source=${link}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<LinkedIn fontSize="large" />}
      iconLabel="LinkedIn"
    />
  );
};

export const RedditIconButton: React.FC<ShareIconButtonProps> = ({
  text,
  link,
}) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://www.reddit.com/submit?url=${link}&title=${text}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<Reddit fontSize="large" />}
      iconLabel="Reddit"
    />
  );
};

export const TelegramIconButton: React.FC<ShareIconButtonProps> = ({
  text,
  link,
}) => {
  const handleShare = async () => {
    try {
      window.open(`https://t.me/share/url?text=${text}&url=${link}`, "_blank");
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<Telegram fontSize="large" />}
      iconLabel="Telegram"
    />
  );
};

export const WhatsAppIcon: React.FC<ShareIconButtonProps> = ({
  text,
  link,
}) => {
  const handleShare = async () => {
    try {
      window.open(`https://wa.me/?text=${text} ${link}`, "_blank");
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<WhatsApp fontSize="large" />}
      iconLabel="WhatsApp"
    />
  );
};

export const XTwitterIcon: React.FC<ShareIconButtonProps> = ({
  text,
  link,
}) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://twitter.com/intent/tweet?text=${text} ${link}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareDialogIconButton
      handleShare={handleShare}
      icon={<X fontSize="large" />}
      iconLabel="X"
    />
  );
};

export default ShareDialogIconButton;
