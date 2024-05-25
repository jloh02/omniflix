"use client";

import React, { useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { Box, CardContent, Typography } from "@mui/material";
import KanbanItem from "./KanbanItem";

const example = {
  TODO: [
    {
      id: 1,
      title: "Title",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
  Ongoing: [
    {
      id: 2,
      title: "Title",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      title: "Title",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
  Completed: [
    {
      id: 4,
      title: "Title",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
};
const KanbanBoard: React.FC = () => {
  const [instanceId] = useState(() => Symbol("instanceId"));
  const [data, setData] = useState(example);

  return (
    <Box display="flex" flexDirection="row" width="100%" gap={3}>
      {Object.entries(data).map(([title, items], colIdx) => (
        <KanbanColumn key={colIdx} title={title} instanceId={instanceId}>
          {items.map((item, idx) => (
            <KanbanItem key={idx} image={item.image} instanceId={instanceId}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1">{item.year}</Typography>
              </CardContent>
            </KanbanItem>
          ))}
        </KanbanColumn>
      ))}
    </Box>
  );
};

export default KanbanBoard;
