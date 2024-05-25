type KanbanItem = {
  id: number;
  title: string;
  year: string;
  image: string;
};

type KanbanItemWithKey = KanbanItem & {
  columnTitle: string;
};

export type { KanbanItem, KanbanItemWithKey };
