import { ItemType } from "../types";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

import DraggableItem from "./DragableItems";

const Sidebar = () => {
  const items: ItemType[] = [
    { id: 1, type: "text", content: "Drag me!" },
    { id: 2, type: "text", content: "Hello, world!" },
    { id: 3, type: "image", content: image1 },
    { id: 3, type: "image", content: image2 },
    { id: 3, type: "image", content: image3 },
  ];

  return (
    <div className="w-1/4 p-4 bg-gray-100 border-r space-y-4">
      {items.map((item) => (
        <DraggableItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
