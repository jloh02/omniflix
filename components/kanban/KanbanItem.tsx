import React, { useEffect, useRef, useState } from "react";
import { Box, Card } from "@mui/material";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

interface KanbanItemProps {
  item: any; //TODO type the item object
  instanceId: symbol;
  children?: React.ReactNode;
}

const IMAGE_SIZE = 100;

const KanbanItem: React.FC<KanbanItemProps> = ({
  item,
  instanceId,
  children,
}: KanbanItemProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    return draggable({
      element,
      getInitialData: () => ({ instanceId, item }),
      onDragStart: () => setIsDragging(true),
      onDrop: () => setIsDragging(false),
    });
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

export default KanbanItem;
