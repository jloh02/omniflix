"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { KanbanItem } from "@/components/kanban/kanbanTypes";
import { MediaType, MediaTypeToParam } from "@/utils/constants";
import LikeDislikeButtons from "@/components/cards/LikeDislikeButtons";
import FavoriteButton from "@/components/cards/FavoriteButton";
import Link from "next/link";
import { OpenInNew } from "@mui/icons-material";

const MAX_BUTTON_WIDTH = 200;

interface KanbanCardRendererProps {
  item: KanbanItem;
  mediaType: MediaType;
}

const KanbanCardRenderer: React.FC<KanbanCardRendererProps> = ({
  item,
  mediaType,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldShrink, setShouldShrink] = useState(false);

  const { urlPath } = MediaTypeToParam[mediaType];

  useEffect(() => {
    const updateShrinkStatus = () => {
      if (!containerRef.current) return;
      setShouldShrink(containerRef.current.offsetWidth < MAX_BUTTON_WIDTH);
    };
    window.addEventListener("resize", updateShrinkStatus);
    return () => window.removeEventListener("resize", updateShrinkStatus);
  }, []);

  return (
    <CardContent
      ref={containerRef}
      sx={{ "&:last-child": { paddingBottom: "12px" } }}
    >
      <Tooltip title={item.title} disableHoverListener={!shouldShrink}>
        <Typography
          variant="h6"
          noWrap={true}
          textOverflow="ellipsis"
          fontSize={shouldShrink ? "0.85rem" : "1.25rem"}
        >
          {item.title}
        </Typography>
      </Tooltip>

      <Typography variant="body1" fontSize={shouldShrink ? "0.7rem" : "1rem"}>
        {item.year}
      </Typography>
      <Box display="flex" alignItems="center" overflow="hidden">
        {shouldShrink || (
          <>
            <FavoriteButton mediaId={item.id} mediaType={mediaType} />
            <LikeDislikeButtons mediaId={item.id} mediaType={mediaType} />
          </>
        )}

        <Link href={urlPath + "/" + item.id} target="_blank">
          <Tooltip title="View more">
            <IconButton>
              <OpenInNew fontSize={shouldShrink ? "small" : "medium"} />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </CardContent>
  );
};

export default KanbanCardRenderer;
