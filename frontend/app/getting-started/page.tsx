"use client";
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import {
  BIO_MAX_CHAR_LENGTH,
  DASHBOARD_PAGE_ROUTE,
  NAME_MAX_CHAR_LENGTH,
  USERNAME_MAX_CHAR_LENGTH,
} from "@/utils/constants";
import addUserInfo from "@/utils/database/userProfile/addUserInfo";
import { useRouter } from "next/navigation";

const OnboardingPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  return (
    <>
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
        <form
          onSubmit={async (e) => {
            e.preventDefault();
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
              <Typography ml={1}>Username</Typography>
              <TextField
                value={username}
                color="secondary"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username unique to you!"
                fullWidth
                inputProps={{ maxLength: USERNAME_MAX_CHAR_LENGTH }}
              />
            </Box>
            <Box>
              <Typography ml={1}>Name</Typography>
              <TextField
                value={name}
                color="secondary"
                onChange={(e) => setName(e.target.value)}
                placeholder="What do people call you?"
                fullWidth
                inputProps={{ maxLength: NAME_MAX_CHAR_LENGTH }}
              />
            </Box>
            <Box>
              <Typography ml={1}>Bio</Typography>
              <TextField
                value={bio}
                color="secondary"
                onChange={(e) => setBio(e.target.value)}
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
    </>
  );
};

export default OnboardingPage;
