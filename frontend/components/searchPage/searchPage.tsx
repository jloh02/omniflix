"use client";

import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import {
  DEBOUNCE_DURATION_IN_MS,
  MINIMUM_SEARCH_LENGTH,
  MediaType,
} from "@/utils/constants";
import { Clear } from "@mui/icons-material";
import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import { useInView } from "react-intersection-observer";
import getTopLists from "@/utils/database/recommendations/getTopLists";
import IBook from "@/utils/types/IBook";
import HorizontalCardList from "../cards/HorizontalCardList";
import MediaCard from "../cards/MediaCard";

interface SearchPageProps<T extends IMovieTvSeries | IBook> {
  title: string;
  type: MediaType;
  getLatestMedia?: (mediaType: MediaType) => Promise<boolean | undefined>;
  searchCallback: (
    mediaType: MediaType,
    searchInput: string,
    page: number | undefined,
    errorCallback: (error: string) => void,
  ) => Promise<[T[], pageNumber: number]>;
}

const SearchPage = <T extends IMovieTvSeries | IBook>({
  title,
  type,
  getLatestMedia,
  searchCallback,
}: SearchPageProps<T>) => {
  const [topLists, setTopLists] = useState<Record<string, T[]>>({}); // Top lists as a placeholder
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<number | undefined>();
  const [reachedEnd, setReachedEnd] = useState(false);

  //Fetch top lists
  useEffect(() => {
    if (!getLatestMedia) return;

    const updateTopLists = () => getTopLists<T>(type).then(setTopLists);
    updateTopLists();

    getLatestMedia(type).then((success) => {
      if (success) updateTopLists();
    });
  }, [type]);

  // Handle debounced search event
  const searchInputDebounced = useDebounce(
    searchInput,
    DEBOUNCE_DURATION_IN_MS,
  );
  useEffect(() => {
    setPage(undefined);
    setSearchResult([]);
    setError("");
    setReachedEnd(false);

    if (searchInput.length < MINIMUM_SEARCH_LENGTH) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
  }, [searchInput]);

  // Handle search
  const searchApiCallback = useCallback(async () => {
    let hasErrored = false;
    const [results, pageNumber] = await searchCallback(
      type,
      searchInput,
      page,
      (error) => {
        if (page == 1) setError(error);
        setIsLoading(false);
        hasErrored = true;
      },
    );

    if (hasErrored) return;
    setError("");
    setIsLoading(false);

    if (!results.length) {
      if (page == 1) {
        setError("No results found");
        return;
      }

      setReachedEnd(true);
      return;
    }

    setSearchResult((res) => res.concat(results));
    setPage(pageNumber);
  }, [page, searchInput, type]);

  useEffect(() => {
    if (searchInputDebounced.length < MINIMUM_SEARCH_LENGTH) return;
    searchApiCallback();
  }, [searchInputDebounced]);

  // Load more on scroll to last item
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && !reachedEnd) searchApiCallback();
  }, [inView, reachedEnd]);

  let content;

  if (isLoading) content = <LinearProgress color="secondary" />;
  else if (error.length) {
    content = <Typography color="error">{error}</Typography>;
  } else {
    const showTopLists = !Boolean(searchResult.length);
    content = (
      <Box>
        {/* Display search results */}
        <Grid
          display={showTopLists ? "none" : "flex"}
          pb={40}
          container
          spacing={3}
          sx={{ alignItems: "stretch" }}
        >
          {searchResult.map((media, idx) => (
            <Grid
              key={idx}
              item
              ref={idx === searchResult.length - 1 ? ref : null} //Attach inView ref to last item
            >
              <MediaCard mediaType={type} media={media} showLabel={false} />
            </Grid>
          ))}
        </Grid>

        {/* Display top lists */}
        <Box display={showTopLists ? "block" : "none"} pb={40}>
          {Object.entries(topLists).map(([listName, mediaList], idx) => (
            <Box key={idx} pb={3}>
              <Typography variant="h5" className="my-4">
                {listName}
              </Typography>
              <HorizontalCardList mediaList={mediaList} type={type} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "90%", padding: "10px" }}>
      <Typography align="left" variant="h4" className="!my-4">
        {title}
      </Typography>

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
        placeholder="Search"
        variant="outlined"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
      />
      {content}
    </Box>
  );
};

export default SearchPage;
