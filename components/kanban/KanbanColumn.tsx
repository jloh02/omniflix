import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
<<<<<<< Updated upstream
import { Box, Typography, alpha, colors, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface KanbanColumnProps {
  title: string;
  children?: React.ReactNode;
=======
import { Box, Divider, Typography, alpha, useTheme } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  KanbanDropType,
  KanbanItem,
  KanbanItemWithKeyIndex,
} from "./kanbanTypes";
import KanbanCard from "./KanbanCard";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

interface KanbanColumnProps {
  title: string;
  instanceId: symbol;
  items: KanbanItemWithKeyIndex[];
  renderKanbanCard: (item: KanbanItem) => React.ReactNode;
>>>>>>> Stashed changes
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
<<<<<<< Updated upstream
  children,
=======
  instanceId,
  items,
  renderKanbanCard,
>>>>>>> Stashed changes
}: KanbanColumnProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const [draggedEdgeIndex, setDraggedEdgeIndex] = useState<number | null>(null);

  const createAdaptiveDraggedEdge = useCallback(
    (idxIfTop: number, idxIfBottom: number) => {
      return function (
        data: Record<string | symbol, unknown>,
        dragActive: boolean,
      ) {
        const edge = extractClosestEdge(data);
        setDraggedEdgeIndex((currentEdgeIndex) => {
          // console.log("FIRST ", currentEdgeIndex, edge, dragActive);
          const indicatorIdx = edge === "top" ? idxIfTop : idxIfBottom;
          if (dragActive) {
            // console.log("SETTING ", indicatorIdx);
            return indicatorIdx;
          }
          // Only disable indicator when the card is not being dragged
          else if (currentEdgeIndex && currentEdgeIndex === indicatorIdx) {
            // console.log("NOTSETTING ", currentEdgeIndex, indicatorIdx);
            return null;
          } else return currentEdgeIndex;
        });
      };
    },
    [],
  );

  const setDraggingColumn = useCallback(
    createAdaptiveDraggedEdge(0, items.length),
    [items.length],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
<<<<<<< Updated upstream
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
=======
      getData: ({ input, element }) =>
        attachClosestEdge(
          { instanceId, title, type: "column" as KanbanDropType },
          { input, element, allowedEdges: ["top", "bottom"] },
        ),
      canDrop: ({ source }) => source.data.instanceId === instanceId,
      // onDrag: ({ self }) => setDraggingColumn(self.data, true),
      onDragEnter: ({ self }) => {
        // setDraggingColumn(self.data, true);
        setIsDraggedOver(true);
      },
      onDragLeave: ({ self }) => {
        // setDraggingColumn(self.data, false);
        setIsDraggedOver(false);
      },
      onDrop: ({ self }) => {
        // setDraggingColumn(self.data, false);
        setIsDraggedOver(false);
      },
>>>>>>> Stashed changes
    });
  }, [ref]);

  const Indicator = <Divider key="indicator" color="secondary" />;

  return (
    <Box width="100%" ref={ref}>
      <Typography pl={1}>{title}</Typography>
      <Box
        border="2px solid"
        borderColor="secondary.main"
        borderRadius="10px"
        p={2}
        display="flex"
        flexDirection="column"
        gap={1}
        height="100%"
        sx={{
          backgroundColor: isDraggedOver
            ? alpha(theme.palette.primary.light, 0.35)
            : null,
        }}
      >
        {items.map((item, idx) => (
          <>
            {draggedEdgeIndex === idx && Indicator}
            <KanbanCard
              key={idx}
              instanceId={instanceId}
              item={item}
              setEdge={createAdaptiveDraggedEdge(idx, idx + 1)}
            >
              {renderKanbanCard(item)}
            </KanbanCard>
          </>
        ))}
        {draggedEdgeIndex === items.length && Indicator}
      </Box>
    </Box>
  );
};

export default KanbanColumn;
