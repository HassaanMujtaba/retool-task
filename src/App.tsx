import React from "react";
import { useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";


import { SectionType } from "./types";
import Sidebar from "./components/Sidebar";
import MainSection from "./components/MainSection";

export default function App() {
  const [sections, setSections] = useState<SectionType[]>([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <Sidebar />
        <MainSection sections={sections} setSections={setSections} />
      </div>
    </DndProvider>
  );
}
