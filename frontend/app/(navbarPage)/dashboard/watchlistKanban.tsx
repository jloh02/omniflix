"use client";

import React, { useEffect, useState } from "react";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Box } from "@mui/material";
import { KanbanItem } from "@/components/kanban/kanbanTypes";
import getWatchlist from "@/utils/database/watchlist/getWatchlist";
import { MediaType } from "@/utils/constants";
import KanbanCardRenderer from "./kanbanCardRenderer";

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
          <KanbanCardRenderer mediaType={mediaType} item={item} />
        )}
        mediaType={mediaType}
      />
    </Box>
  );
};

export default WatchlistKanban;
