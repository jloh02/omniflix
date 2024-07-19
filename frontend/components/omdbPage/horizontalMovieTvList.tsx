import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import { Box, Grid } from "@mui/material";
import React, { useLayoutEffect, useRef, useState } from "react";
import MovieTvSeriesCard from "../cards/MovieTvSeriesCard";
import { MediaType } from "@/utils/constants";
import { ChevronRight } from "@mui/icons-material";

const HorizontalMovieTvList: React.FC<{
  mediaList: IMovieTvSeries[];
  type: MediaType;
}> = ({ mediaList, type }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showScrollableBox, setShowScrollableBox] = useState(false);

  useLayoutEffect(() => {
    const updateScrollableBox = () => {
      if (gridRef && gridRef.current)
        setShowScrollableBox(
          gridRef.current.clientWidth < gridRef.current.scrollWidth,
        );
    };
    window.addEventListener("resize", updateScrollableBox);

    return () => {
      window.removeEventListener("resize", updateScrollableBox);
    };
  }, [gridRef, mediaList]);

  return (
    <Box position="relative">
      <Grid
        ref={gridRef}
        container
        spacing={3}
        pb={1}
        sx={{
          alignItems: "stretch",
          overflowX: "auto",
          scrollbarColor: "grey transparent",
          scrollbarWidth: "thin",
        }}
        wrap="nowrap"
        onScroll={(e) =>
          setScrollPosition((e.target as HTMLDivElement).scrollLeft)
        }
      >
        {mediaList.map((media, idx) => (
          <Grid key={idx} item>
            <MovieTvSeriesCard media={media} type={type} showLabel={false} />
          </Grid>
        ))}
      </Grid>
      {/* Indicator that horizontal list is scrollable */}
      {showScrollableBox && (
        <Box
          position="absolute"
          width="70px"
          top="3%"
          bottom="3%"
          right={0}
          pr={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            pointerEvents: "none",
            opacity: Math.max(1.0 - scrollPosition / 200.0, 0.0),
            transition: "opacity 0.3s",
            background:
              "linear-gradient(90deg, transparent, #000000BA, #000000FF)",
          }}
        >
          <ChevronRight fontSize="large" sx={{ color: "white" }} />
        </Box>
      )}
    </Box>
  );
};

export default HorizontalMovieTvList;
