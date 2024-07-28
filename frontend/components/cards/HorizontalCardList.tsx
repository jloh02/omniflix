import IMovieTvSeries from "@/utils/types/IMovieTvSeries";
import { Box, Grid } from "@mui/material";
import React from "react";
import MediaCard from "./MediaCard";
import { MediaType } from "@/utils/constants";
import { useScrollableBox } from "@/utils/hooks/useScrollableBox";
import IBook from "@/utils/types/IBook";

const HorizontalCardList: React.FC<{
  mediaList: (IMovieTvSeries | IBook)[];
  type: MediaType;
}> = ({ mediaList, type }) => {
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
      >
        {mediaList.map((media, idx) => (
          <Grid key={idx} item>
            <MediaCard mediaType={type} media={media} showLabel={false} />
          </Grid>
        ))}
      </Grid>
      {/* Indicator that horizontal list is scrollable */}
      {scrollableBox}
    </Box>
  );
};

export default HorizontalCardList;
