"use client";

import {
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  DASHBOARD_PAGE_ROUTE,
  FORGOT_PASSWORD_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from "@/utils/constants";
import { useRouter } from "next/navigation";
import { signIn } from "@/utils/supabase/auth";

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" mb={1}>
        <Typography variant="caption" textAlign="center">
          Welcome to Omniflix!
          <br />
          Not a member?{" "}
          <MuiLink
            color="text.primary"
            component="span"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              router.push(SIGNUP_PAGE_ROUTE);
            }}
          >
            Sign Up here
          </MuiLink>
        </Typography>
      </Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoadingAuth(true);
          const { success, error } = await signIn(email, password);
          setIsLoadingAuth(false);
          setError(error ?? "");
          if (success) {
            router.push(DASHBOARD_PAGE_ROUTE);
          }
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography ml={1}>Email</Typography>
            <TextField
              fullWidth
              color="secondary"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </Box>
          <Box>
            <Typography ml={1}>Password</Typography>
            <TextField
              fullWidth
              color="secondary"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </Box>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            type="submit"
            disabled={isLoadingAuth}
          >
            {isLoadingAuth ? "Signing In..." : "Sign In"}
          </Button>
          {error && (
            <Typography width="100%" textAlign="center" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </form>
      <Box display="flex" justifyContent="center" width="100%" my={1}>
        <MuiLink
          variant="caption"
          color="text.primary"
          component="span"
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            router.push(FORGOT_PASSWORD_PAGE_ROUTE);
          }}
        >
          Forgot password?
        </MuiLink>
      </Box>
    </>
  );
};

export default SignInForm;
