"use client";

import React, { useEffect, useState } from "react";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { KanbanItem } from "@/components/kanban/kanbanTypes";
import getWatchlist from "@/utils/database/watchlist/getWatchlist";
import { MediaType, MediaTypeToParam } from "@/utils/constants";
import LikeDislikeButtons from "@/components/cards/LikeDislikeButtons";
import FavoriteButton from "@/components/cards/FavoriteButton";
import Link from "next/link";
import { MoreHoriz } from "@mui/icons-material";

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

  const { urlPath } = MediaTypeToParam[mediaType];

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
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Typography variant="h6" noWrap={true} textOverflow="ellipsis">
                  {item.title}
                </Typography>
                <Typography variant="body1">{item.year}</Typography>
              </Box>
              <FavoriteButton mediaId={item.id} mediaType={mediaType} />
              <LikeDislikeButtons mediaId={item.id} mediaType={mediaType} />
              <Link href={urlPath + "/" + item.id} target="_blank">
                <Tooltip title="View more">
                  <IconButton>
                    <MoreHoriz />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </CardContent>
        )}
        mediaType={mediaType}
      />
    </Box>
  );
};

export default WatchlistKanban;
