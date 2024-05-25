import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Typography, alpha, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  KanbanDropType,
  KanbanItem,
  KanbanItemWithKeyIndex,
} from "./kanbanTypes";
import KanbanCard from "./KanbanCard";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

interface KanbanColumnProps {
  title: string;
  instanceId: symbol;
  items: KanbanItemWithKeyIndex[];
  renderKanbanCard: (item: KanbanItem) => React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  instanceId,
  items,
  renderKanbanCard,
}: KanbanColumnProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData: ({ input, element }) =>
        attachClosestEdge(
          { instanceId, title, type: "column" as KanbanDropType },
          { input, element, allowedEdges: ["top", "bottom"] },
        ),
      canDrop: ({ source }) => source.data.instanceId === instanceId,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, [ref, title]);

  return (
    <Box display="flex" flexDirection="column" width="100%" ref={ref}>
      <Typography pl={1} sx={{ userSelect: "none" }}>
        {title}
      </Typography>
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
        {...items.map((item, idx) => (
          <>
            <KanbanCard key={idx} instanceId={instanceId} item={item}>
              {renderKanbanCard(item)}
            </KanbanCard>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default KanbanColumn;
