"use client";

import React, { useEffect, useState } from "react";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Box, CardContent, Typography } from "@mui/material";
import { KanbanItem } from "@/components/kanban/kanbanTypes";
import getWatchlist from "@/utils/database/watchlist/getWatchlist";

const WATCHLIST_COLUMNS = ["To Watch", "Watched"];

const MovieWatchlist: React.FC = () => {
  const [movieWatchlist, setMovieWatchlist] = useState<
    | {
        [columnId: string]: KanbanItem[];
      }
    | undefined
  >();

  useEffect(() => {
    getWatchlist("movie", WATCHLIST_COLUMNS).then((watchlist) =>
      setMovieWatchlist(watchlist),
    );
  }, []);

  return (
    <Box>
      <KanbanBoard
        kanbanData={movieWatchlist}
        columnNames={WATCHLIST_COLUMNS}
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
