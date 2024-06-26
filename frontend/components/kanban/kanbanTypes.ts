type KanbanItem = {
  id: number;
  columnOrder: string;
  title: string;
  year: string;
  image: string;
};

type KanbanItemWithKeyIndex = KanbanItem & {
  columnTitle: string;
  index: number;
};

type KanbanDropType = "column" | "card";

export type { KanbanDropType, KanbanItem, KanbanItemWithKeyIndex };
