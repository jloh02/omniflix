import React from "react";
import KanbanColumn from "./KanbanColumn";
import { Box, CardContent, Typography } from "@mui/material";
import KanbanItem from "./KanbanItem";

const KanbanBoard: React.FC = () => {
  return (
    <Box display="flex" flexDirection="row" width="100%" gap={3}>
      <KanbanColumn title="TODO">
        <KanbanItem image="https://picsum.photos/200/300">
          <CardContent>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body1">1980</Typography>
          </CardContent>
        </KanbanItem>
      </KanbanColumn>
      <KanbanColumn title="Ongoing">
        <KanbanItem image="https://picsum.photos/200/300">
          <CardContent>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body1">1980</Typography>
          </CardContent>
        </KanbanItem>
        <KanbanItem image="https://picsum.photos/200/300">
          <CardContent>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body1">1980</Typography>
          </CardContent>
        </KanbanItem>
      </KanbanColumn>
      <KanbanColumn title="Completed">
        <KanbanItem image="https://picsum.photos/200/300">
          <CardContent>
            <Typography variant="h6">Title</Typography>
            <Typography variant="body1">1980</Typography>
          </CardContent>
        </KanbanItem>
      </KanbanColumn>
    </Box>
  );
};

export default KanbanBoard;
