"use client";
import { Avatar, Box, Typography } from "@mui/material";
import ShareButton from "../socialShare/ShareButton";
import { USER_PUBLIC_PROFILE_PAGE_ROUTE } from "@/utils/constants";
import { useEffect, useState } from "react";
import ViewProfileButton from "./ViewProfileButton";

interface UserInfoHeaderPersonalProps {
  name: string;
  username: string;
  bio: string;
}

const UserInfoHeaderPersonal: React.FC<UserInfoHeaderPersonalProps> = ({
  name,
  username,
  bio,
}) => {
  const [profileRoute, setProfileRoute] = useState<string | undefined>();

  useEffect(() => {
    // This runs on the client side, where window is defined
    const profilePageRoute = `${window.location.origin}${USER_PUBLIC_PROFILE_PAGE_ROUTE}/${username}`;
    setProfileRoute(profilePageRoute);
  }, [username]);

  return (
    <Box
      width="100%"
      minHeight="30vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(45deg, #FD7702 30%, #FF5003 90%)",
      }}
    >
      <Box
        width="60%"
        minWidth="500px"
        display="flex"
        flexDirection="column"
        alignItems="start"
        gap={1}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
          <Avatar sx={{ width: "15vh", height: "15vh" }} />
          <Box>
            <Typography variant="h4">{name}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>@{username}</Typography>
            <Box marginY={1} display="flex" gap={1}>
              <ViewProfileButton username={username} />
              <ShareButton
                text={`Check out ${name}'s profile on Omniflix!`}
                link={profileRoute}
              />
            </Box>
          </Box>
        </Box>
        <Typography>{bio}</Typography>
      </Box>
    </Box>
  );
};

export default UserInfoHeaderPersonal;
