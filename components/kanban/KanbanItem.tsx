import React from "react";
import { Box, Card } from "@mui/material";

interface KanbanItemProps {
  image: string;
  children?: React.ReactNode;
}

const IMAGE_SIZE = 100;

const KanbanItem: React.FC<KanbanItemProps> = ({
  image,
  children,
}: KanbanItemProps) => {
  return (
    <Card sx={{ cursor: "pointer" }}>
      <Box display="flex" flexDirection="row">
        <Box
          width={IMAGE_SIZE}
          height={IMAGE_SIZE}
          component="img"
          src={image}
        ></Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          {children}
        </Box>
      </Box>
    </Card>
  );
};

export default KanbanItem;
