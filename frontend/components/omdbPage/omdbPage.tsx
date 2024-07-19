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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useDebounce from "@/utils/hooks/useDebounce";
import {
  DEBOUNCE_DURATION_IN_MS,
  MINIMUM_SEARCH_LENGTH,
  MediaType,
  MediaTypeToParam,
  OMDB_FULL_RESPONSE_LENGTH,
} from "@/utils/constants";
import { Clear } from "@mui/icons-material";
import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import searchOmdb from "@/utils/database/omdb/searchOmdb";
import { objectKeysSnakeCaseToCamelCase } from "@/utils/objectKeysSnakeCaseToCamelCase";
import MovieTvSeriesCard from "../cards/MovieTvSeriesCard";
import { useInView } from "react-intersection-observer";
import getTopLists from "@/utils/database/recommendations/getTopLists";
import HorizontalMovieTvList from "./horizontalMovieTvList";
import getLatestMovieTv from "@/utils/database/latest/getLatestMovieTv";

interface OmdbPageProps {
  title: string;
  type: MediaType;
}

const OmdbPage: React.FC<OmdbPageProps> = ({ title, type }) => {
  const [topLists, setTopLists] = useState<Record<string, IMovieTvSeries[]>>(
    {},
  ); // Top lists as a placeholder
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState<IMovieTvSeries[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);

  const { omdbType } = useMemo(() => MediaTypeToParam[type], [type]);

  //Fetch top lists
  useEffect(() => {
    const updateTopLists = () => getTopLists(type).then(setTopLists);
    updateTopLists();
    getLatestMovieTv(omdbType).then((success) => {
      if (success) updateTopLists();
    });
  }, [omdbType, type]);

  // Handle debounced search event
  const searchInputDebounced = useDebounce(
    searchInput,
    DEBOUNCE_DURATION_IN_MS,
  );
  useEffect(() => {
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
  const searchOmdbCallback = useCallback(async () => {
    const response = await searchOmdb(searchInput, omdbType, page);
    if (response["Error"]) {
      setError(response["Error"]);
      setIsLoading(false);
      return;
    }

    if (!response["Search"]) {
      setError("No results found");
      return;
    }

    const processedRes = (response["Search"] as object[]).map(
      (mediaObj: object) =>
        objectKeysSnakeCaseToCamelCase(mediaObj) as IMovieTvSeries,
    );

    if (processedRes.length < OMDB_FULL_RESPONSE_LENGTH) setReachedEnd(true);

    setSearchResult((res) => res.concat(processedRes));
    setPage((page) => page + 1);
    setIsLoading(false);
  }, [page, searchInput, omdbType]);

  useEffect(() => {
    if (searchInputDebounced.length < MINIMUM_SEARCH_LENGTH) return;
    searchOmdbCallback();
  }, [searchInputDebounced]);

  // Load more on scroll to last item
  const { ref, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && !reachedEnd) searchOmdbCallback();
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
              <MovieTvSeriesCard media={media} type={type} showLabel={false} />
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
              <HorizontalMovieTvList mediaList={mediaList} type={type} />
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

export default OmdbPage;
