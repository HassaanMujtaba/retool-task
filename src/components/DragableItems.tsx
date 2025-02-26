import React from "react";
import { useDrag } from "react-dnd";
import { ItemType } from "../types";

const DraggableItem = ({ item }: { item: ItemType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "component",
    item,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div
      // right now i can't find the type for the ref as am using react dnd
      ref={drag}
      className={`p-3 border rounded-lg cursor-pointer bg-white shadow-md transition-all h-screen${
        isDragging ? "opacity-60 transform scale-95" : "hover:shadow-lg"
      }`}
    >
      {item.type === "text" ? (
        item.content
      ) : (
        <img src={item.content} alt="" className="w-full h-20 object-cover" />
      )}
    </div>
  );
};

export default DraggableItem;
