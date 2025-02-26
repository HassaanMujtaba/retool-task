import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Section from "./Section";
import SectionPage from "./SectionPage"; 
import { ItemType, SectionType } from "../types";

type MainSectionProps = {
  sections: SectionType[];
  setSections: React.Dispatch<React.SetStateAction<SectionType[]>>;
};

const MainSection = ({ sections, setSections }: MainSectionProps) => {
  const [isPreview, setIsPreview] = useState(false); 

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "component",
    drop: (item: ItemType) => {
      setSections((prev) => {
        const lastSection = prev[prev.length - 1];
        if (lastSection && lastSection.items.length < 2) {
          return prev.map((section, index) =>
            index === prev.length - 1
              ? { ...section, items: [...section.items, item] }
              : section
          );
        } else {
          return [...prev, { id: prev.length, items: [item], columns: 1 }];
        }
      });
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  const toggleColumnLayout = (sectionIndex: number) => {
    setSections((prev) =>
      prev.map((section, index) =>
        index === sectionIndex
          ? { ...section, columns: section.columns === 1 ? 2 : 1 }
          : section
      )
    );
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    setSections((prev) =>
      prev
        .map((section, sIndex) =>
          sIndex === sectionIndex
            ? {
                ...section,
                items: section.items.filter((_, i) => i !== itemIndex),
              }
            : section
        )
        .filter((section) => section.items.length > 0)
    );
  };

  const updateItemContent = (
    sectionIndex: number,
    itemIndex: number,
    newContent: string
  ) => {
    setSections((prev) =>
      prev.map((section, sIndex) =>
        sIndex === sectionIndex
          ? {
              ...section,
              items: section.items.map((item, iIndex) =>
                iIndex === itemIndex ? { ...item, content: newContent } : item
              ),
            }
          : section
      )
    );
  };

  if (isPreview) {
    return (
      <div className="fixed inset-0  overflow-auto">
        <button
          onClick={() => setIsPreview(false)}
          className="px-2 py-2 bg-black text-white opacity-15 rounded-lg fixed top-4 left-4 z-50 cursor-pointer"
        >
          X
        </button>
        <SectionPage sections={sections} />
      </div>
    );
  }

  return (
    <div
      ref={drop}
      className={`flex-1 min-h-screen bg-gray-50 ${
        isOver ? "bg-blue-100" : ""
      }`}
    >
      <div className=" h-[100vh] overflow-y-scroll">
        {sections.map((section, sectionIndex) => (
          <Section
            key={section.id}
            section={section}
            sectionIndex={sectionIndex}
            toggleColumnLayout={toggleColumnLayout}
            removeItem={removeItem}
            updateItemContent={updateItemContent}
          />
        
        ))}
          <div className="h-[40vh] w-[calc(100%-2rem)] bg-white m-2 rounded ">asdasdadasd</div>
      </div>
      
      {sections?.length > 0 && (
        <div className="flex justify-center mt-6 absolute bottom-2 right-0 w-full">
          <button
            onClick={() => setIsPreview(true)}
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all z-0 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Preview Full Page
          </button>
        </div>
      )}
    </div>
  );
};

export default MainSection;
