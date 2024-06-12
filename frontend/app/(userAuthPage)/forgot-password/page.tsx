"use client";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_PAGE_ROUTE } from "@/utils/constants";
import { sendPasswordResetLink } from "@/utils/supabase/auth";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const router = useRouter();

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" mb={1}>
        <Typography variant="caption" textAlign="center">
          Enter your email address and we'll email you a link to reset your
          password
        </Typography>
      </Box>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const { success, error } = await sendPasswordResetLink(email);
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
          <Button fullWidth color="secondary" variant="outlined" type="submit">
            Send Reset Link
          </Button>
        </Box>
      </form>
      <Box display="flex" justifyContent="center" width="100%" my={1}>
        <MuiLink
          variant="caption"
          color="text.primary"
          component="span"
          sx={{ cursor: "pointer" }}
          onClick={() => router.push(LOGIN_PAGE_ROUTE)}
        >
          Back to Sign In
        </MuiLink>
        {error && (
          <Typography width="100%" textAlign="center" color="error">
            {error}
          </Typography>
        )}
      </Box>
      <Dialog open={showDialog}>
        <DialogContent sx={{ p: 4 }}>
          <Typography mb={2} variant="h6">
            Password Reset Link Sent
          </Typography>
          <Typography>
            Check your email and click on the link to reset password! <br />
            Emails will only be sent if an account with that email exists.
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

export default ForgotPasswordForm;
