"use client";

import React, { useEffect, useRef, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { Box, CardContent, Typography } from "@mui/material";
import KanbanItem from "./KanbanItem";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const example = {
  TODO: [
    { title: "Title", year: "1980", image: "https://picsum.photos/200/300" },
  ],
  Ongoing: [
    { title: "Title", year: "1980", image: "https://picsum.photos/200/300" },
    { title: "Title", year: "1980", image: "https://picsum.photos/200/300" },
  ],
  Completed: [
    { title: "Title", year: "1980", image: "https://picsum.photos/200/300" },
  ],
};
const KanbanBoard: React.FC = () => {
  const [instanceId] = useState(() => Symbol("instance-id"));
  const [data, setData] = useState(example);

  return (
    <Box display="flex" flexDirection="row" width="100%" gap={3}>
      {Object.entries(data).map(([title, items], colIdx) => (
        <KanbanColumn key={colIdx} title={title}>
          {items.map((item, idx) => (
            <KanbanItem key={idx} image={item.image}>
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
