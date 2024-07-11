import React, { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { MediaType } from "@/utils/constants";

interface LoadableCardButtonProps {
  mediaType: MediaType;
  mediaId: number;
  checkEnabledFn: (
    mediaType: MediaType,
    mediaId: number,
  ) => Promise<boolean | undefined>;
  disableFn: (
    mediaType: MediaType,
    mediaId: number,
  ) => Promise<boolean | undefined>;
  enableFn: (
    mediaType: MediaType,
    mediaId: number,
  ) => Promise<boolean | undefined>;
  loadingText: string;
  enabledText: string;
  disabledText: string;
  childIcon: JSX.Element | ((isEnabled: boolean) => JSX.Element);
}

const LoadableCardButton: React.FC<LoadableCardButtonProps> = ({
  mediaType,
  mediaId,
  checkEnabledFn,
  disableFn,
  enableFn,
  loadingText,
  enabledText,
  disabledText,
  childIcon,
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkEnabled = useCallback(async () => {
    checkEnabledFn(mediaType, mediaId).then((success) => {
      setIsEnabled(success ?? false);
      setIsLoading(false);
    });
  }, [isEnabled, isLoading, mediaType, mediaId]);

  useEffect(() => {
    checkEnabled();
  }, [mediaType, mediaId]);

  return (
    <Box>
      <Tooltip
        title={isLoading ? loadingText : isEnabled ? enabledText : disabledText}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
            width: 30,
          }}
        >
          <CircularProgress
            size={20}
            color="secondary"
            sx={{
              position: "absolute",
              height: 30,
              opacity: isLoading ? 1 : 0,
            }}
          />
          <IconButton
            disabled={isLoading}
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLoading(true);
              if (isEnabled) {
                const success = await disableFn(mediaType, mediaId);
                if (success) setIsEnabled(false);
              } else {
                const success = await enableFn(mediaType, mediaId);
                if (success) setIsEnabled(true);
              }
              setIsLoading(false);
            }}
            sx={{ height: 30, width: 30, opacity: isLoading ? 0 : 1 }}
          >
            <Box
              display="flex"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                transitionDelay: "0.15s",
              }}
            >
              {typeof childIcon === "function"
                ? childIcon(isEnabled)
                : childIcon}
            </Box>
          </IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default LoadableCardButton;
