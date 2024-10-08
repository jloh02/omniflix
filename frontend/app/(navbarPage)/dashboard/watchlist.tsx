"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CATEGORIES, LocalStorageKeys, MediaType } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import WatchlistKanban from "./watchlistKanban";
import { getDefaultExpanded, setDefaultExpanded } from "@/utils/localStorage";

const AccordionContent = (category: string) => {
  if (category === "Movies")
    return (
      <WatchlistKanban
        mediaType={MediaType.MOVIE}
        columns={["To Watch", "Watched"]}
      />
    );

  if (category === "TV Series")
    return (
      <WatchlistKanban
        mediaType={MediaType.TV_SERIES}
        columns={["To Watch", "Watching", "Watched"]}
      />
    );

  if (category === "Books")
    return (
      <WatchlistKanban
        mediaType={MediaType.BOOK}
        columns={["To Read", "Reading", "Completed"]}
      />
    );

  return <Typography>WIP</Typography>;
};

const Watchlist: React.FC = () => {
  return (
    <Box>
      {CATEGORIES.map((category, index) => (
        <Accordion
          key={index}
          defaultExpanded={getDefaultExpanded(
            LocalStorageKeys.WATCHLIST,
            index,
          )}
          onChange={(_, expanded) =>
            setDefaultExpanded(LocalStorageKeys.WATCHLIST, index, expanded)
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {category}
          </AccordionSummary>
          <AccordionDetails>{AccordionContent(category)}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Watchlist;
