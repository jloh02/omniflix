"use client";

import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";
import React, { useMemo, useState } from "react";
import SignInForm from "./SignInForm";
import { LoginPageState } from "./LoginPageState";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SignUpForm from "./SignUpForm";

const Login: React.FC = () => {
  const [pageState, setPageState] = useState<LoginPageState>(
    LoginPageState.SIGN_IN,
  );

  const page = useMemo(() => {
    switch (pageState) {
      case LoginPageState.SIGN_IN:
        return <SignInForm setPageState={setPageState} />;
      case LoginPageState.SIGN_UP:
        return <SignUpForm setPageState={setPageState} />;
      case LoginPageState.FORGOT_PASSWORD:
        return <ForgotPasswordForm setPageState={setPageState} />;
      default:
        throw new Error("Invalid page state " + pageState);
    }
  }, [pageState]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className="h-full w-full"
      p={2}
    >
      <Card
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          width: "40%",
          minWidth: "300px",
          maxWidth: "450px",
          maxHeight: "95%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "2px",
          },
          "&::-webkit-scrollbar-track": {
            my: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "1px",
            backgroundColor: (theme) => theme.palette.secondary.main,
          },
        }}
      >
        <CardHeader title={pageState.toString()} sx={{ textAlign: "center" }} />
        <Divider
          sx={{
            width: "3em",
            mx: "auto",
            borderWidth: "1px",
            backgroundColor: "secondary.main",
            borderRadius: "1px",
          }}
        />
        <CardContent>{page}</CardContent>
      </Card>
    </Box>
  );
};

export default Login;
