"use client";

import React, { useState } from "react";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Box, CardContent, Typography } from "@mui/material";
import { KanbanItem } from "@/components/kanban/kanbanTypes";

const example = {
  TODO: [
    {
      id: 1,
      title: "1",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
  Ongoing: [
    {
      id: 2,
      title: "2",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      title: "3",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
  Completed: [
    {
      id: 4,
      title: "4",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
} as {
  [columnId: string]: KanbanItem[];
};

const MovieWatchlist: React.FC = () => {
  const [movieWatchlist, setMovieWatchlist] = useState(example);

  return (
    <Box>
      <KanbanBoard
        kanbanData={movieWatchlist}
        setKanbanData={setMovieWatchlist}
        renderKanbanCard={(item) => (
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="body1">{item.year}</Typography>
          </CardContent>
        )}
      />
    </Box>
  );
};

export default MovieWatchlist;
