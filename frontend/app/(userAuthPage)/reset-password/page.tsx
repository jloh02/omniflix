"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { LOGIN_PAGE_ROUTE, PASSWORD_MIN_CHAR_LENGTH } from "@/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/utils/supabase/auth";
import { createClient } from "@/utils/supabase/client";

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();

  // Check if there was an error loading the page
  const searchParams = useSearchParams();
  const loadError = useMemo(
    () => searchParams.get("error_description") ?? "",
    [searchParams],
  );

  // Password must be at least 6 characters
  const isInvalidPassword = useMemo(() => {
    return password.length < PASSWORD_MIN_CHAR_LENGTH;
  }, [password]);

  // Passwords must match
  const isPasswordMismatch = useMemo(() => {
    return password !== confirmPassword;
  }, [password, confirmPassword]);

  // Get current email
  const supabaseClient = createClient();
  supabaseClient.auth
    .getUser()
    .then(({ data: { user } }) => setEmail(user?.email ?? "unknown"));

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" mb={1}>
        <Typography variant="caption" textAlign="center">
          Looks like someone forgot their password? Let's help you change it!
          <br />
          Email: {email}
        </Typography>
      </Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isInvalidPassword || isPasswordMismatch) return;

          setIsLoadingAuth(true);
          const { success, error } = await resetPassword(password);
          setError(error ?? "");
          if (success) setShowDialog(true);
          setIsLoadingAuth(false);
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
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
            {isLoadingAuth ? "Trying to change password..." : "Change password"}
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
            Password Resetted!
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
      <Dialog open={loadError.length > 0}>
        <DialogContent sx={{ p: 4 }}>
          <Typography mb={2} variant="h6"></Typography>
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

export default ResetPasswordPage;
