import {
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { LoginPageState } from "./LoginPageState";

const ForgotPasswordForm: React.FC<{
  setPageState: React.Dispatch<React.SetStateAction<LoginPageState>>;
}> = ({ setPageState }) => {
  const [email, setEmail] = useState("");

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%" mb={1}>
        <Typography variant="caption" textAlign="center">
          Enter your email address and we'll send you a reset password link
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography ml={1}>Email</Typography>
          <TextField
            fullWidth
            color="secondary"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </Box>
        <Button fullWidth color="secondary" variant="outlined">
          Send Reset Link
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" width="100%" my={1}>
        <MuiLink
          variant="caption"
          color="text.primary"
          component="span"
          sx={{ cursor: "pointer" }}
          onClick={() => setPageState(LoginPageState.SIGN_IN)}
        >
          Back to Sign In
        </MuiLink>
      </Box>
    </>
  );
};

export default ForgotPasswordForm;
