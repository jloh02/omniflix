"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import {
  BIO_MAX_CHAR_LENGTH,
  DASHBOARD_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  NAME_MAX_CHAR_LENGTH,
  USERNAME_MAX_CHAR_LENGTH,
} from "@/utils/constants";
import addUserInfo from "@/utils/database/userProfile/addUserInfo";
import { useRouter } from "next/navigation";
import { signOut } from "@/utils/supabase/auth";

const OnboardingForm: React.FC<{ email: string }> = ({ email }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [bioError, setBioError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const validateUsername = (value: string) => {
    setUsernameError(null);

    if (value.length === 0) {
      setUsernameError("Username is required.");
    }

    if (value.length > USERNAME_MAX_CHAR_LENGTH) {
      setUsernameError(
        `Username must be less than ${USERNAME_MAX_CHAR_LENGTH} characters long.`,
      );
    }
  };

  const validateName = (value: string) => {
    setNameError(null);

    if (value.length === 0) {
      setNameError("Name is required.");
    }

    if (value.length > NAME_MAX_CHAR_LENGTH) {
      setNameError(
        `Name must be less than ${NAME_MAX_CHAR_LENGTH} characters long.`,
      );
    }
  };

  const validateBio = (value: string) => {
    setBioError(null);

    if (value.length > BIO_MAX_CHAR_LENGTH) {
      setBioError(
        `Bio must be less than ${BIO_MAX_CHAR_LENGTH} characters long.`,
      );
    }
  };

  return (
    <Box
      m="auto"
      display="flex"
      flexDirection="column"
      gap={2}
      minWidth="300px"
      width="50%"
      maxWidth="600px"
    >
      <Typography variant="h4">Omniflix</Typography>
      <Typography variant="h5">
        Let's get you setup! Tell us more about yourself!
      </Typography>
      <Typography variant="caption">
        Logged in as {email}.{" "}
        <MuiLink
          variant="caption"
          color="text.primary"
          component="span"
          sx={{ cursor: "pointer" }}
          onClick={async () => {
            await signOut();
            router.push(LOGIN_PAGE_ROUTE);
          }}
        >
          Incorrect account?
        </MuiLink>
      </Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (
            usernameError ||
            nameError ||
            bioError ||
            username.length === 0 ||
            name.length === 0
          )
            return;
          setIsLoading(true);
          const error = await addUserInfo(name, username, bio);
          setError(error);
          if (!error) {
            router.push(DASHBOARD_PAGE_ROUTE);
          }
          setIsLoading(false);
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Box>
            <Typography ml={1}>
              Username* (max {USERNAME_MAX_CHAR_LENGTH} characters)
            </Typography>
            <TextField
              value={username}
              color="secondary"
              onChange={(e) => {
                setUsername(e.target.value);
                validateUsername(e.target.value);
              }}
              error={Boolean(usernameError)}
              helperText={usernameError}
              placeholder="Choose a username unique to you!"
              fullWidth
              inputProps={{ maxLength: USERNAME_MAX_CHAR_LENGTH }}
            />
          </Box>
          <Box>
            <Typography ml={1}>
              Name* (max {NAME_MAX_CHAR_LENGTH} characters)
            </Typography>
            <TextField
              value={name}
              color="secondary"
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              error={Boolean(nameError)}
              helperText={nameError}
              placeholder="What do people call you?"
              fullWidth
              inputProps={{ maxLength: NAME_MAX_CHAR_LENGTH }}
            />
          </Box>
          <Box>
            <Typography ml={1}>
              Bio (optional, max {BIO_MAX_CHAR_LENGTH} characters)
            </Typography>
            <TextField
              value={bio}
              color="secondary"
              onChange={(e) => {
                setBio(e.target.value);
                validateBio(e.target.value);
              }}
              error={Boolean(bioError)}
              helperText={bioError}
              placeholder="Tell others about yourself! Shows, movies, genres or hobbies you like! Anything goes!"
              fullWidth
              multiline
              rows={4}
              inputProps={{ maxLength: BIO_MAX_CHAR_LENGTH }}
            />
          </Box>
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            disabled={isLoading}
          >
            {isLoading ? "Getting you ready..." : "Get me started!"}
          </Button>
        </Box>
      </form>
      <Typography textAlign="center" color="error">
        {error}
      </Typography>
    </Box>
  );
};

export default OnboardingForm;
