import {
  Box,
  Button,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { LoginPageState } from "./LoginPageState";

const SignInForm: React.FC<{
  setPageState: React.Dispatch<React.SetStateAction<LoginPageState>>;
}> = ({ setPageState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            onClick={() => setPageState(LoginPageState.SIGN_UP)}
          >
            Sign Up here
          </MuiLink>
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
        <Box>
          <Typography ml={1}>Password</Typography>
          <TextField
            fullWidth
            color="secondary"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </Box>
        <Button fullWidth color="secondary" variant="outlined">
          Sign In
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" width="100%" my={1}>
        <MuiLink
          variant="caption"
          color="text.primary"
          component="span"
          sx={{ cursor: "pointer" }}
          onClick={() => setPageState(LoginPageState.FORGOT_PASSWORD)}
        >
          Forgot password?
        </MuiLink>
      </Box>
    </>
  );
};

export default SignInForm;
