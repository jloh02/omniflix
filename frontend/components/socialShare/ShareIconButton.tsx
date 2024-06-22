"use client";
import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Box,
  Snackbar,
  SvgIcon,
  SvgIconProps,
  Tooltip,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {
  Close,
  Email,
  FacebookOutlined,
  LinkOutlined,
  LinkedIn,
  Reddit,
  Reply,
  Telegram,
  WhatsApp,
  X,
} from "@mui/icons-material";
import ThreadsLogo from "./threads-logo-white.svg";

interface ShareListIconButtonProps {
  handleShare: () => void;
  icon: JSX.Element;
  iconLabel: string;
}

const ShareListIconButton: React.FC<ShareListIconButtonProps> = ({
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

const CopyLinkIconButton: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
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
      <ShareListIconButton
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

const NativeShareIconButton: React.FC<ShareIconButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Omniflix",
        text: text,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<ShareIcon fontSize="large" />}
      iconLabel="Share"
    />
  );
};

const MailIconButton: React.FC<ShareIconButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      window.open(
        `mailto:?subject=${text}&body=${window.location.href}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<Email fontSize="large" />}
      iconLabel="Email"
    />
  );
};

const FacebookIconButton: React.FC = () => {
  const handleShare = async () => {
    try {
      window.open(
        `https://facebook.com/sharer/sharer.php?u=${window.location.href}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<FacebookOutlined fontSize="large" />}
      iconLabel="Facebook"
    />
  );
};

const LinkedInIconButton: React.FC<ShareIconButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${text}&summary=${text}&source=${window.location.href}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<LinkedIn fontSize="large" />}
      iconLabel="LinkedIn"
    />
  );
};

const RedditIconButton: React.FC<ShareIconButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://www.reddit.com/submit?url=${window.location.href}&title=${text}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<Reddit fontSize="large" />}
      iconLabel="Reddit"
    />
  );
};

const TelegramIconButton: React.FC<ShareIconButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://t.me/share/url?text=${text}&url=${window.location.href}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<Telegram fontSize="large" />}
      iconLabel="Telegram"
    />
  );
};

const WhatsAppIcon: React.FC<ShareIconButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://wa.me/?text=${text} ${window.location.href}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<WhatsApp fontSize="large" />}
      iconLabel="WhatsApp"
    />
  );
};

const XTwitterIcon: React.FC<ShareIconButtonProps> = ({ text }) => {
  const handleShare = async () => {
    try {
      window.open(
        `https://twitter.com/intent/tweet?text=${text} ${window.location.href}`,
        "_blank",
      );
    } catch (err) {
      console.error("Failed to share: ", err);
    }
  };

  return (
    <ShareListIconButton
      handleShare={handleShare}
      icon={<X fontSize="large" />}
      iconLabel="X"
    />
  );
};

interface ShareIconButtonProps {
  text: string;
}

const ShareIconButton: React.FC<ShareIconButtonProps> = ({ text }) => {
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
      <Dialog open={open} onClose={toggleDialog}>
        <DialogTitle>Share</DialogTitle>
        <DialogContent>
          <List
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              padding: 0,
            }}
          >
            <CopyLinkIconButton />
            <NativeShareIconButton text={text} />
            <MailIconButton text={text} />
            <WhatsAppIcon text={text} />
            <TelegramIconButton text={text} />
            <FacebookIconButton />
            <XTwitterIcon text={text} />
            <LinkedInIconButton text={text} />
            <RedditIconButton text={text} />
            {/* Add more share options as needed */}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareIconButton;
