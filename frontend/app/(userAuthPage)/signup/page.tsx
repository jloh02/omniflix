"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { LOGIN_PAGE_ROUTE, MINIMUM_PASSWORD_LENGTH } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { signUp } from "@/utils/supabase/auth";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();

  // Password must be at least 6 characters
  const isInvalidPassword = useMemo(() => {
    return password.length > 0 && password.length < MINIMUM_PASSWORD_LENGTH;
  }, [password]);

  // Passwords must match
  const isPasswordMismatch = useMemo(() => {
    return confirmPassword.length > 0 && password !== confirmPassword;
  }, [password, confirmPassword]);

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" mb={1}>
        <Typography variant="caption" textAlign="center">
          Welcome to Omniflix!
          <br />
          <MuiLink
            color="text.primary"
            component="span"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              router.push(LOGIN_PAGE_ROUTE);
            }}
          >
            Already have an account?
          </MuiLink>
        </Typography>
      </Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isInvalidPassword || isPasswordMismatch) return;

          setIsLoadingAuth(true);
          const { success, error } = await signUp(email, password);
          setIsLoadingAuth(false);
          setError(error ?? "");
          if (success) setShowDialog(true);
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
              placeholder="Password must be 6 characters or more"
              error={isInvalidPassword}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {isInvalidPassword && (
              <Typography variant="caption" ml={1} color="error">
                Passwords must be minimum 6 characters
              </Typography>
            )}
          </Box>
          <Box>
            <Typography ml={1}>Confirm Password</Typography>
            <TextField
              fullWidth
              color="secondary"
              type="password"
              placeholder="Re-enter your password"
              error={isPasswordMismatch}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
            <Typography
              variant="caption"
              ml={1}
              color={isPasswordMismatch ? "error" : "transparent"}
            >
              Passwords do not match
            </Typography>
          </Box>
          <Button fullWidth color="secondary" type="submit" variant="outlined">
            {isLoadingAuth ? "Trying to create account..." : "Sign Up"}
          </Button>
          {error && (
            <Typography width="100%" textAlign="center" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </form>
      <Dialog open={showDialog}>
        <DialogContent sx={{ p: 4 }}>
          <Typography mb={2} variant="h6">
            Omniflix Account Created
          </Typography>
          <Typography>
            Check your email and click on the link to verify!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => router.push(LOGIN_PAGE_ROUTE)}
          >
            Back to Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUpPage;
