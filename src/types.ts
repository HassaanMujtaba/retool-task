export type ItemType = {
    id: number;
    type: "text" | "image";
    content: string;
  };
  
  export type SectionType = {
    id: number;
    items: ItemType[];
    columns: number;
  };
  