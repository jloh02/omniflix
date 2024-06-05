import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { KanbanDropType, KanbanItemWithKeyIndex } from "./kanbanTypes";
import { Close } from "@mui/icons-material";

interface KanbanCardProps {
  item: KanbanItemWithKeyIndex;
  instanceId: symbol;
  children?: React.ReactNode;
  removeItem: (id: string) => void;
}

const IMAGE_SIZE = 100;

const KanbanCard: React.FC<KanbanCardProps> = ({
  item,
  instanceId,
  children,
  removeItem,
}: KanbanCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragEdge, setDragEdge] = useState<Edge | null>(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState<boolean>(false);

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
        getIsSticky: () => true,
        getData: ({ input, element }) =>
          attachClosestEdge(
            { type: "card" as KanbanDropType, item },
            { input, element, allowedEdges: ["top", "bottom"] },
          ),
        onDrag: ({ self }) => setDragEdge(extractClosestEdge(self.data)),
        onDragEnter: ({ self }) => setDragEdge(extractClosestEdge(self.data)),
        onDragLeave: () => setDragEdge(null),
        onDrop: () => setDragEdge(null),
      }),
    );
  }, [ref, item]);

  const Indicator = (
    <Divider
      key="indicator"
      color={theme.palette.secondary.light}
      sx={{ borderBottomWidth: 1.5, borderRadius: 2 }}
    />
  );

  return (
    <>
      {dragEdge === "top" && Indicator}
      <Card
        ref={ref}
        sx={{
          cursor: "pointer",
          opacity: isDragging ? "50%" : "100%",
          display: "absolute",
          "&:hover": { backgroundColor: theme.palette.primary.main },
        }}
      >
        <Box display="flex" flexDirection="row">
          <Box flexShrink={0} width={IMAGE_SIZE} height={IMAGE_SIZE}>
            <Box
              component="img"
              src={item.image}
              sx={{ pointerEvents: "none" }}
            ></Box>
          </Box>
          <Box
            flex={1}
            flexDirection="column"
            justifyContent="center"
            overflow="hidden"
          >
            {children}
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Tooltip title="Remove from watchlist">
              <IconButton
                sx={{ height: "fit-content" }}
                onClick={() => setIsConfirmationDialogOpen(true)}
              >
                <Close />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Card>
      {dragEdge === "bottom" && Indicator}
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={() => setIsConfirmationDialogOpen(false)}
      >
        <DialogTitle>Remove from watchlist?</DialogTitle>
        <DialogContent>
          <Typography>
            {item.title} ({item.year})
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "white" }}
            onClick={() => setIsConfirmationDialogOpen(false)}
          >
            Disagree
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              removeItem(item.id);
              setIsConfirmationDialogOpen(false);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default KanbanCard;
