import { useState } from "react";
import WebpagePreview from "./WebpagePreview";
import { SectionType } from "../types";

type SectionsPageProps = {
  sections: SectionType[];
};

const SectionsPage: React.FC<SectionsPageProps> = ({ sections }) => {
  const [isPreview, setIsPreview] = useState<boolean>(true);

  if (isPreview) {
    return (
      <div className="fixed inset-0  overflow-auto">
        <button
          onClick={() => setIsPreview(false)}
          className="px-2 py-2 bg-black text-white opacity-15 rounded-lg fixed top-4 left-4 z-50 cursor-pointer"
        >
          X
        </button>
        <WebpagePreview sections={sections} />
      </div>
    );
  }

  return null;
};

export default SectionsPage;
