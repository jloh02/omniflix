"use client";

import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import React, { useEffect, useMemo, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import {
  DEBOUNCE_DURATION_IN_MS,
  FriendshipStatus,
  TableNames,
  USER_PUBLIC_PROFILE_PAGE_ROUTE,
} from "@/utils/constants";
import { Clear } from "@mui/icons-material";
import { Tables } from "@/utils/supabase/types.gen";
import searchUserInfo from "@/utils/database/userProfile/searchUserInfo";
import Link from "next/link";
import FriendButton from "@/components/friends/FriendButton";
import getFriendshipStatus from "@/utils/database/friends/getFriendshipStatus";

const SearchTab: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<
    Tables<TableNames.USERS_INFO>[]
  >([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchInputDebounced = useDebounce(
    searchInput,
    DEBOUNCE_DURATION_IN_MS,
  );

  // Handle search event
  useEffect(() => {
    setSearchResult([]);
    setError("");
    setIsLoading(true);
  }, [searchInput]);

  // Handle search
  useEffect(() => {
    searchUserInfo(searchInputDebounced).then(async (response) => {
      if (response?.error) {
        setError(response.error.message);
        setIsLoading(false);
        return;
      }

      setSearchResult(response?.data ?? []);
      setIsLoading(false);
    });
  }, [searchInputDebounced]);

  return (
    <Box sx={{ width: "100%", padding: "10px" }}>
      {/* Search bar */}
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setSearchInput("")}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className="w-full !mb-8"
        placeholder="Search username"
        variant="outlined"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />

      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : searchResult.length && !error.length ? (
        <List>
          {searchResult.map(({ user_id, name, username }) => (
            <UserListItem userId={user_id} name={name} username={username} />
          ))}
        </List>
      ) : (
        <Typography color="error">{error}</Typography>
      )}
    </Box>
  );
};

interface UserListItemProps {
  userId: string;
  name: string;
  username: string;
}

const UserListItem: React.FC<UserListItemProps> = ({
  userId,
  name,
  username,
}) => {
  const [friendshipStatus, setFriendshipStatus] =
    useState<FriendshipStatus | null>(null);

  useEffect(() => {
    getFriendshipStatus(userId).then(async (response) => {
      setFriendshipStatus(response?.data ?? null);
    });
  }, []);

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Tooltip title={`Go to ${name}'s profile`} placement="bottom-start">
        <Link
          href={`${USER_PUBLIC_PROFILE_PAGE_ROUTE}/${username}`}
          passHref
          style={{ flexGrow: 1 }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={`@${username}`} />
          </ListItem>
        </Link>
      </Tooltip>
      {friendshipStatus !== null && (
        <FriendButton
          userId={userId}
          username={username}
          friendshipStatus={friendshipStatus}
        />
      )}
    </Box>
  );
};

export default SearchTab;
