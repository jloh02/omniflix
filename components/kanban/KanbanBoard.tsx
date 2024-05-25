"use client";

import React, { useEffect, useMemo, useState } from "react";
import KanbanColumn from "./KanbanColumn";
import { Box, CardContent, Typography } from "@mui/material";
import KanbanCard from "./KanbanCard";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  KanbanDropType,
  KanbanItem,
  KanbanItemWithKeyIndex,
} from "./kanbanTypes";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

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

const KanbanBoard: React.FC = () => {
  const [instanceId] = useState(() => Symbol("instanceId"));
  const [data, setData] = useState<{ [columnId: string]: KanbanItem[] }>(
    example,
  );

  const dataWithKeyAndIdx = useMemo<{
    [columnId: string]: KanbanItemWithKeyIndex[];
  }>(
    () =>
      Object.fromEntries(
        Object.entries(data).map(([columnTitle, items]) => [
          columnTitle,
          items.map((item, index) => ({
            ...item,
            columnTitle,
            index,
          })),
        ]),
      ),
    [data],
  );

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];

        // Handle null values
        if (!destination || !source.data || !destination.data) return;

        const sourceData = source.data;
        const desData = destination.data;

        // Source must always be a card (kanban item)
        if (sourceData.type !== "card" || !sourceData.item) return;

        // Disallow non card or column type drops
        if (!(desData.type as KanbanDropType)) return;

        // Make sure we have a card to move
        const itemToMove = sourceData.item as KanbanItemWithKeyIndex;
        if (!itemToMove) return;

        const sourceItem = sourceData.item as KanbanItemWithKeyIndex;
        const edge = extractClosestEdge(desData);

        let sourceColumn = "";
        let desColumn = "";
        let insertIdx = -1;

        switch (desData.type as KanbanDropType) {
          case "column":
            sourceColumn = sourceItem.columnTitle;
            desColumn = desData.title as string;
            if (edge === "top") insertIdx = 0;
            break;
          case "card":
            sourceColumn = sourceItem.columnTitle;
            const desItem = desData.item as KanbanItemWithKeyIndex;
            desColumn = desItem.columnTitle;
            insertIdx = desItem.index + (edge === "bottom" ? 1 : 0);
            break;
          default:
            throw new Error("Unhandled KanbanDropType in KanbanBoard");
        }

        if (!sourceColumn || !desColumn || !itemToMove || !itemToMove.id)
          return;

        // Do not move if the item is dropped in the same column and the same index
        if (sourceColumn === desColumn && insertIdx === sourceItem.index)
          return;

        setData((prevData) => {
          const updatedData = structuredClone(prevData);

          // Remove old item from list
          updatedData[sourceColumn].splice(sourceItem.index, 1);
          // Add new item to list
          if (insertIdx !== -1) {
            // If the item is moved within the same column, we need to adjust the index
            if (sourceColumn === desColumn && insertIdx > sourceItem.index)
              insertIdx--;

            updatedData[desColumn].splice(insertIdx, 0, itemToMove);
          } else {
            updatedData[desColumn].push(itemToMove);
          }

          return updatedData;
        });
      },
    });
  }, [dataWithKeyAndIdx]);

  return (
    <Box display="flex" flexDirection="row" width="100%" gap={3} mb={2}>
      {Object.entries(dataWithKeyAndIdx).map(([title, items], colIdx) => (
        <KanbanColumn key={colIdx} title={title} instanceId={instanceId}>
          {items.map((item, idx) => (
            <KanbanCard key={idx} instanceId={instanceId} item={item}>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1">{item.year}</Typography>
              </CardContent>
            </KanbanCard>
          ))}
        </KanbanColumn>
      ))}
    </Box>
  );
};

export default KanbanBoard;
