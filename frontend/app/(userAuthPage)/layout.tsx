"use client";

import {
  FORGOT_PASSWORD_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  RESET_PASSWORD_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from "@/utils/constants";
import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { Suspense, useMemo } from "react";

const AuthPageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const path = usePathname();

  const pageName = useMemo(() => {
    switch (path) {
      case LOGIN_PAGE_ROUTE:
        return "Sign In";
      case SIGNUP_PAGE_ROUTE:
        return "Sign Up";
      case FORGOT_PASSWORD_PAGE_ROUTE:
        return "Forgot Password";
      case RESET_PASSWORD_PAGE_ROUTE:
        return "Reset Password";
      default:
        throw new Error("Invalid page path " + path);
    }
  }, [path]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      width="100%"
      my="auto"
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "auto",
          backgroundColor: (theme) => theme.palette.background.default,
          width: "40%",
          minWidth: "300px",
          maxWidth: "450px",
        }}
      >
        <CardHeader
          title={<strong>{pageName}</strong>}
          sx={{ textAlign: "center" }}
        />
        <Divider
          sx={{
            width: "3em",
            mx: "auto",
            borderWidth: "1px",
            backgroundColor: "secondary.main",
            borderRadius: "1px",
          }}
        />
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthPageLayout;
