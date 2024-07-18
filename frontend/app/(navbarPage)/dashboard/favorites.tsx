"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CATEGORIES,
  CategoryToMediaType,
  LocalStorageKeys,
} from "@/utils/constants";
import { Box } from "@mui/material";
import FavoritesComponent from "./favoritesComponent";
import { getDefaultExpanded, setDefaultExpanded } from "@/utils/localStorage";

const Favorites: React.FC = () => {
  return (
    <Box>
      {CATEGORIES.map((category, index) => (
        <Accordion
          key={index}
          defaultExpanded={getDefaultExpanded(
            LocalStorageKeys.FAVORITES,
            index,
          )}
          onChange={(_, expanded) =>
            setDefaultExpanded(LocalStorageKeys.FAVORITES, index, expanded)
          }
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {category}
          </AccordionSummary>
          <AccordionDetails>
            <FavoritesComponent mediaType={CategoryToMediaType[category]} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default Favorites;
