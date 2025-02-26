import { useState } from "react";
import WebpagePreview from "./WebpagePreview";
import { SectionType, ItemType } from "../types";

type SectionProps = {
  section: SectionType;
  sectionIndex: number;
  toggleColumnLayout: (index: number) => void;
  removeItem: (sectionIndex: number, itemIndex: number) => void;
  updateItemContent: (
    sectionIndex: number,
    itemIndex: number,
    newContent: string
  ) => void;
};

const Section: React.FC<SectionProps> = ({
  section,
  sectionIndex,
  toggleColumnLayout,
  removeItem,
  updateItemContent,
}) => {
  const [isPreview, setIsPreview] = useState<boolean>(false);

  if (isPreview) {
    return (
      <div className="fixed inset-0  overflow-auto">
        <button
          onClick={() => setIsPreview(false)}
          className="px-2 py-2 bg-black text-white opacity-15 rounded-lg fixed top-4 left-4 z-50 cursor-pointer"
        >
          X
        </button>
        <WebpagePreview sections={[section]} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl overflow-hidden shadow-xl transition-all hover:shadow-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => toggleColumnLayout(sectionIndex)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {section.columns === 1 ? "Split into Two Columns" : "Full Width"}
        </button>
      </div>

      <div
        className={`grid ${
          section.columns === 1 ? "grid-cols-1" : "grid-cols-2"
        } gap-6`}
      >
        {section.items.map((item: ItemType, itemIndex: number) => (
          <div
            key={itemIndex}
            className="relative p-4 border rounded-2xl bg-gray-100 flex flex-col items-center transition-all hover:bg-gray-200 shadow-md"
          >
            {item.type === "text" ? (
              <textarea
                value={item.content}
                onChange={(e) =>
                  updateItemContent(sectionIndex, itemIndex, e.target.value)
                }
                className="w-full min-h-[100px] h-56 p-3 border rounded-lg bg-white resize-none overflow-hidden break-words shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
                placeholder="Enter text..."
              />
            ) : (
              <>
                <img
                  src={item.content}
                  alt="Preview"
                  className="w-full h-56 mb-4 object-cover rounded-lg bg-center shadow-sm"
                />
                <input
                  type="text"
                  value={item.content}
                  onChange={(e) =>
                    updateItemContent(sectionIndex, itemIndex, e.target.value)
                  }
                  className="w-full p-4 border rounded-lg"
                  placeholder="Enter image URL"
                />
              </>
            )}

            <button
              onClick={() => removeItem(sectionIndex, itemIndex)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded-full transition-all hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
