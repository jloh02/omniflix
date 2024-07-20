import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Box, Typography, alpha, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  KanbanDropType,
  KanbanItem,
  KanbanItemWithKeyIndex,
} from "./kanbanTypes";
import KanbanCard from "./KanbanCard";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { useScrollableBox } from "@/utils/hooks/useScrollableBox";

interface KanbanColumnProps {
  title: string;
  instanceId: symbol;
  items: KanbanItemWithKeyIndex[];
  renderKanbanCard: (item: KanbanItem) => React.ReactNode;
  removeItem: (id: number) => void;
  condensedView?: boolean;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  instanceId,
  items,
  renderKanbanCard,
  removeItem,
  condensedView,
}: KanbanColumnProps) => {
  const dropTargetRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  useEffect(() => {
    const element = dropTargetRef.current;
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
  }, [dropTargetRef, title]);

  // Indicator that list is scrollable
  const { ref: colRef, scrollableBox } = useScrollableBox("vertical", [items]);

  // Used on mobile for not showing all items
  if (condensedView) {
    return (
      <Box
        flex="1 1 0px"
        display="flex"
        flexDirection="column"
        ref={dropTargetRef}
      >
        <Typography pl={1} sx={{ userSelect: "none" }}>
          {title}
        </Typography>
        <Box
          border="2px dotted"
          borderColor="secondary.main"
          borderRadius="10px"
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100%"
          sx={{
            backgroundColor: isDraggedOver
              ? alpha(theme.palette.primary.light, 0.35)
              : alpha(theme.palette.secondary.light, 0.35),
          }}
        >
          <Typography variant="h6" lineHeight={1.1}>
            {items.length}
          </Typography>
          <Typography>Items</Typography>
          <Typography textAlign="center" variant="caption">
            (Click to view, Drag to move here)
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      flex="1 1 0px"
      display="flex"
      flexDirection="column"
      ref={dropTargetRef}
    >
      <Typography pl={1} sx={{ userSelect: "none" }}>
        {title}
      </Typography>
      <Box
        position="relative"
        height="100%"
        border="2px solid"
        borderColor="secondary.main"
        borderRadius="10px"
        minHeight="10vh"
      >
        <Box
          p={2}
          display="flex"
          flexDirection="column"
          height="100%"
          ref={colRef}
          sx={{
            overflowY: "scroll",
            scrollbarColor: "grey transparent",
            scrollbarWidth: "thin",
            backgroundColor: isDraggedOver
              ? alpha(theme.palette.primary.light, 0.35)
              : null,
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            height="max-content"
            gap={1}
          >
            {items.map((item, idx) => (
              <KanbanCard
                key={idx}
                instanceId={instanceId}
                item={item}
                removeItem={removeItem}
              >
                {renderKanbanCard(item)}
              </KanbanCard>
            ))}
          </Box>
        </Box>
        {scrollableBox}
      </Box>
    </Box>
  );
};

export default KanbanColumn;
