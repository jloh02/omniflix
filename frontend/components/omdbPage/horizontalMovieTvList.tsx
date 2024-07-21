import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import MovieTvSeriesCard from "../cards/MovieTvSeriesCard";
import { MediaType } from "@/utils/constants";
import { useScrollableBox } from "@/utils/hooks/useScrollableBox";

const HorizontalMovieTvList: React.FC<{
  mediaList: IMovieTvSeries[];
  type: MediaType;
}> = ({ mediaList, type }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { ref: gridRef, scrollableBox } = useScrollableBox("horizontal", [
    mediaList,
  ]);

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
      {scrollableBox}
    </Box>
  );
};

export default HorizontalMovieTvList;
