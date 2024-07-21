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
import { useScrollableBox } from "@/utils/hooks/useScrollableBox";

interface KanbanColumnProps {
  title: string;
  instanceId: symbol;
  items: KanbanItemWithKeyIndex[];
  renderKanbanCard: (item: KanbanItem) => React.ReactNode;
  removeItem: (id: number) => void;
  mobileConfig?: {
    isColumnSelected: boolean;
    setMobileSelectedColumn: React.Dispatch<React.SetStateAction<string>>;
  };
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  instanceId,
  items,
  renderKanbanCard,
  removeItem,
  mobileConfig,
}: KanbanColumnProps) => {
  const dropTargetRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);

  useEffect(() => {
    const element = dropTargetRef.current;
    if (!element) return;

    // If column is already selected, don't allow drop
    if (mobileConfig?.isColumnSelected) return;

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
  }, [dropTargetRef, title, mobileConfig?.isColumnSelected]);

  // Indicator that list is scrollable
  const { ref: colRef, scrollableBox } = useScrollableBox("vertical", [
    items,
    mobileConfig?.isColumnSelected,
  ]);

  // Used on mobile for not showing all items
  if (mobileConfig) {
    const { isColumnSelected, setMobileSelectedColumn } = mobileConfig;
    return (
      <Box
        flex="1 1 0px"
        display="flex"
        flexDirection="column"
        ref={dropTargetRef}
        sx={{ cursor: "pointer" }}
        // Disable click if column is already selected
        onClick={() => !isColumnSelected && setMobileSelectedColumn(title)}
      >
        <Typography pl={1} sx={{ userSelect: "none" }}>
          {title}
        </Typography>
        <Box
          border={`2px ${isColumnSelected ? "solid" : "dotted"}`}
          borderColor="secondary.main"
          borderRadius="10px"
          p={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          sx={{
            backgroundColor: isDraggedOver
              ? alpha(theme.palette.primary.light, 0.35)
              : alpha(
                  theme.palette.secondary.main,
                  isColumnSelected ? 0.8 : 0.4,
                ),
          }}
        >
          <Typography variant="h6" lineHeight={1.1}>
            {items.length}
          </Typography>
          <Typography>Items</Typography>
          {!isColumnSelected && (
            <Typography textAlign="center" variant="caption">
              (Click to view, Drag to move here)
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box
      flex="1 1 0px"
      display="flex"
      width="0"
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
            overflowY: "auto",
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
