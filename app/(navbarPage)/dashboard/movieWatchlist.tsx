"use client";

import React, { useState } from "react";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Box, CardContent, Typography } from "@mui/material";
import { KanbanItem } from "@/components/kanban/kanbanTypes";

const example = {
  "To Watch": [
    {
      id: 1,
      title: "Title1",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      title: "Title2",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      title: "Title3",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
  Watched: [
    {
      id: 4,
      title: "Title4",
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
