import React, { useEffect, useRef, useState } from "react";
import { Box, Card } from "@mui/material";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { KanbanDropType, KanbanItemWithKeyIndex } from "./kanbanTypes";

interface KanbanCardProps {
  item: KanbanItemWithKeyIndex;
  instanceId: symbol;
  children?: React.ReactNode;
}

const IMAGE_SIZE = 100;

const KanbanCard: React.FC<KanbanCardProps> = ({
  item,
  instanceId,
  children,
}: KanbanCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  //TODO display closest edge
  const [edge, setEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => ({
          type: "card" as KanbanDropType,
          instanceId,
          item,
        }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => source.data.instanceId === instanceId,
        getData: ({ input, element }) =>
          attachClosestEdge(
            { type: "card" as KanbanDropType, item },
            { input, element, allowedEdges: ["top", "bottom"] },
          ),
      }),
    );
  }, [ref, item]);

  return (
    <Card
      ref={ref}
      sx={{ cursor: "pointer", opacity: isDragging ? "50%" : "100%" }}
    >
      <Box display="flex" flexDirection="row">
        <Box
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          component="img"
          src={item.image}
          sx={{ pointerEvents: "none" }}
        ></Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          {children}
        </Box>
      </Box>
    </Card>
  );
};

export default KanbanCard;
