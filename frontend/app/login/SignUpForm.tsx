import {
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { LoginPageState } from "./LoginPageState";
import { MINIMUM_PASSWORD_LENGTH } from "@/utils/constants";

const SignUpForm: React.FC<{
  setPageState: React.Dispatch<React.SetStateAction<LoginPageState>>;
}> = ({ setPageState }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Password must be at least 6 characters
  const isInvalidPassword = useMemo(() => {
    return password.length > 0 && password.length < MINIMUM_PASSWORD_LENGTH;
  }, [password]);

  // Passwords must match
  const isPasswordMismatch = useMemo(() => {
    return confirmPassword.length > 0 && password !== confirmPassword;
  }, [password, confirmPassword]);

  // Username must be between 5 and 20 characters
  // and only contain alphanumeric characters and _
  const isValidUsername = useMemo(() => {
    return /^[a-zA-Z0-9_]{5,20}$/.test(username);
  }, [username]);

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
            onClick={() => setPageState(LoginPageState.SIGN_IN)}
          >
            Already have an account?
          </MuiLink>
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <Box>
          <Typography ml={1}>Name</Typography>
          <TextField
            fullWidth
            color="secondary"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
        </Box>
        <Box>
          <Typography ml={1}>Username</Typography>
          <TextField
            fullWidth
            color="secondary"
            value={username}
            error={username.length > 0 && !isValidUsername}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          {username.length > 0 && !isValidUsername && (
            <Typography component="div" variant="caption" ml={1} color="error">
              Usernames must be between 5 and 20 characters and only contain
              letters, numbers or "_"
            </Typography>
          )}
        </Box>
        <Box>
          <Typography ml={1}>Email</Typography>
          <TextField
            fullWidth
            color="secondary"
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
            error={isPasswordMismatch}
            type="password"
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
        <Button fullWidth color="secondary" variant="outlined">
          Sign Up
        </Button>
        {error && (
          <Typography width="100%" textAlign="center" color="error">
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default SignUpForm;
