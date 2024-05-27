type KanbanItem = {
  id: number;
  title: string;
  year: string;
  image: string;
};

type KanbanItemWithKeyIndex = KanbanItem & {
  columnTitle: string;
  index: number;
};

type KanbanDropType = "column" | "card";

export type { KanbanItem, KanbanItemWithKeyIndex, KanbanDropType };
