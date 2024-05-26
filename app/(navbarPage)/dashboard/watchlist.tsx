import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CATEGORIES } from "@/utils/constants";
import { Box, Typography } from "@mui/material";
import MovieWatchlist from "./movieWatchlist";

const Watchlist: React.FC = () => {
  return (
    <Box>
      {CATEGORIES.map((category, index) => (
        <Accordion key={index} defaultExpanded={!index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {category}
          </AccordionSummary>
          <AccordionDetails>
            {category === "Movies" ? (
              <MovieWatchlist />
            ) : (
              <Typography>WIP</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Watchlist;
