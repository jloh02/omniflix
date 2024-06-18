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
import { LOGIN_PAGE_ROUTE, PASSWORD_MIN_CHAR_LENGTH } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { signUp } from "@/utils/supabase/auth";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [signUpError, setSignUpError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();

  const validatePasswordInput = (value: string) => {
    setPasswordError(null);

    if (value.length < PASSWORD_MIN_CHAR_LENGTH) {
      setPasswordError(
        `Password must be at least ${PASSWORD_MIN_CHAR_LENGTH} characters long.`,
      );
    }
  };

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
          if (
            passwordError ||
            confirmPasswordError ||
            password != confirmPassword
          )
            return;

          setIsLoadingAuth(true);
          const { success, error } = await signUp(email, password);
          setSignUpError(error ?? "");
          if (success) setShowDialog(true);
          setIsLoadingAuth(false);
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
              error={Boolean(passwordError)}
              helperText={passwordError}
              value={password}
              onChange={(ev) => {
                validatePasswordInput(ev.target.value);
                setPassword(ev.target.value);
              }}
            />
          </Box>
          <Box>
            <Typography ml={1}>Confirm Password</Typography>
            <TextField
              fullWidth
              color="secondary"
              type="password"
              placeholder="Re-enter your password"
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              onChange={(ev) => {
                setConfirmPassword(ev.target.value);
                if (ev.target.value !== password) {
                  setConfirmPasswordError("Passwords do not match");
                } else {
                  setConfirmPasswordError("");
                }
              }}
            />
          </Box>
          <Button fullWidth color="secondary" type="submit" variant="outlined">
            {isLoadingAuth ? "Creating account..." : "Sign Up"}
          </Button>
          {signUpError && (
            <Typography width="100%" textAlign="center" color="error">
              {signUpError}
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
