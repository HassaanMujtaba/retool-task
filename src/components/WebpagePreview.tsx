import React from "react";
import { SectionType } from "../types";

type WebpagePreviewProps = {
  sections: SectionType[];
};

const WebpagePreview: React.FC<WebpagePreviewProps> = ({ sections }) => {
  return (
    <div className="min-h-screen bg-gray-100">
    
      {sections?.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className={`grid ${
            section.columns === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {section?.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="w-full flex items-start justify-start"
            >
              {item.type === "text" ? (
                <div className="w-full p-2 text-lg max-h-86 overflow-hidden text-black break-words whitespace-pre-wrap max-w-full">
                  {item.content}
                </div>
              ) : (
                <img
                  src={item.content}
                  alt="Preview"
                  className="w-full h-86 object-cover "
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WebpagePreview;
