"use client";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import UserMenu from "./UserMenu";

const AuthButtonClient: React.FC<{ name: string }> = ({ name }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {!isMobile && (
        <Typography variant="body2" paddingRight={1}>
          Hi {name}!
        </Typography>
      )}
      <UserMenu />
    </Box>
  );
};

export default AuthButtonClient;
