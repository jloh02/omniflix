"use client";

import React, { useEffect, useState } from "react";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Box, CardContent, Typography } from "@mui/material";
import { KanbanItem } from "@/components/kanban/kanbanTypes";
import getWatchlist from "@/utils/database/watchlist/getWatchlist";
import { MediaType } from "@/utils/constants";

interface WatchlistKanbanProps {
  columns: string[];
  mediaType: MediaType;
}

const WatchlistKanban: React.FC<WatchlistKanbanProps> = ({
  columns,
  mediaType,
}) => {
  const [watchlist, setWatchlist] = useState<
    | {
        [columnId: string]: KanbanItem[];
      }
    | undefined
  >();

  useEffect(() => {
    getWatchlist(mediaType, columns).then((watchlist) =>
      setWatchlist(watchlist),
    );
  }, []);

  return (
    <Box>
      <KanbanBoard
        kanbanData={watchlist}
        columnNames={columns}
        setKanbanData={setWatchlist}
        renderKanbanCard={(item) => (
          <CardContent>
            <Typography variant="h6" noWrap={true} textOverflow="ellipsis">
              {item.title}
            </Typography>
            <Typography variant="body1">{item.year}</Typography>
          </CardContent>
        )}
        mediaType={mediaType}
      />
    </Box>
  );
};

export default WatchlistKanban;
