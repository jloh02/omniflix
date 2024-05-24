import { Box, Typography } from "@mui/material";
import React from "react";

interface KanbanColumnProps {
  title: string;
  children?: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  children,
}: KanbanColumnProps) => {
  return (
    <Box width="100%">
      <Typography pl={1}>{title}</Typography>
      <Box
        border="2px solid"
        borderColor="secondary.main"
        borderRadius="10px"
        p={2}
        display="flex"
        flexDirection="column"
        gap={1}
      >
        {children}
      </Box>
    </Box>
  );
};

export default KanbanColumn;
