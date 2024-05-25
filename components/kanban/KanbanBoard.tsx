"use client";

import React, { useEffect, useMemo, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { Box, CardContent, Typography } from "@mui/material";
import KanbanItem from "./KanbanItem";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

const example = {
  TODO: [
    {
      id: 1,
      title: "1",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
  Ongoing: [
    {
      id: 2,
      title: "2",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      title: "3",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
  Completed: [
    {
      id: 4,
      title: "4",
      year: "1980",
      image: "https://picsum.photos/200/300",
    },
  ],
};

type Item = {
  id: number;
  title: string;
  year: string;
  image: string;
};

type ItemWithKey = Item & {
  columnTitle: string;
};

type ExampleType = {
  [columnTitle: string]: Item[];
};

type ExampleTypeWithKey = ExampleType & {
  [columnTitle: string]: ItemWithKey[];
};

const KanbanBoard: React.FC = () => {
  const [instanceId] = useState(() => Symbol("instanceId"));
  const [data, setData] = useState<ExampleType>(example);

  // TODO typing
  const dataWithKey = useMemo(() => {
    const dataWithKey: ExampleTypeWithKey = {};
    Object.entries(data).forEach(([columnTitle, items]) => {
      dataWithKey[columnTitle] = (items as any[]).map((item: any) => ({
        ...item,
        columnTitle,
      }));
    });
    return dataWithKey;
  }, [data]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        if (!destination) return;

        console.log(source, location);

        //TODO error handling

        const sourceColumn = (source.data.item as ItemWithKey).columnTitle;
        const item = source.data.item as ItemWithKey;
        const desColumn = destination.data.title as string;

        // TODO reposition item in the same column
        // No point dropping item to the same column
        if (sourceColumn === desColumn) return;

        setData((prevData) => {
          const updatedData = structuredClone(prevData);
          // Add new item to list
          updatedData[desColumn] = [...updatedData[desColumn], item];
          // Remove old item from list
          updatedData[sourceColumn] = updatedData[sourceColumn].filter(
            (oldItem: Item) => oldItem.id !== item.id,
          );
          return updatedData;
        });
      },
    });
  }, [dataWithKey]);

  return (
    <Box display="flex" flexDirection="row" width="100%" gap={3} mb={2}>
      {Object.entries(dataWithKey).map(([title, items], colIdx) => (
        <KanbanColumn key={colIdx} title={title} instanceId={instanceId}>
          {items.map((item, idx) => (
            <KanbanItem key={idx} instanceId={instanceId} item={item}>
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
