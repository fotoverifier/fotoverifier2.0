import React, { useRef } from "react";
import { toPng, toJpeg } from "html-to-image";

interface ModalPReportProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal_PReport: React.FC<ModalPReportProps> = ({ isOpen, closeModal }) => {
  const contentRef = useRef<HTMLDivElement>(null); // Reference only for content section

  const handleExport = (format: "png" | "jpeg") => {
    if (contentRef.current) {
      const exportFunction = format === "png" ? toPng : toJpeg;

      exportFunction(contentRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `content-section.${format}`;
          link.click();
        })
        .catch((error) => {
          console.error("Error exporting image:", error);
        });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 h-screen text-black">
          <div className="bg-white rounded-lg w-[80%] h-[90%] p-6 flex flex-col">
            {/* Header Section (Excluded from Capture) */}
            <div className="flex items-center  text-base mb-4">
              <div className="text-large font-bold border-2 border-green-800 rounded-lg px-4 py-2 text-black self-center">
                General Report
              </div>

              {/* Export Buttons */}
              <div className="ml-4 flex space-x-2">
                <div
                  onClick={() => handleExport("png")}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                  Export PNG
                </div>
                <div
                  onClick={() => handleExport("jpeg")}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 cursor-pointer"
                >
                  Export JPEG
                </div>
              </div>

              {/* Close Button */}
              <div
                onClick={closeModal}
                className="ml-auto bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition duration-300"
              >
                ×
              </div>
            </div>

            {/* Content Section (Only this part is captured) */}
            <div className="flex flex-1 border-t pt-4 text-lg bg-white" ref={contentRef}>
              <div className="flex-1 p-4 border-r border-gray-200">
                <h3 className="font-semibold mb-2 text-base">JPEG Ghost</h3>
                <div className="text-sm"> Content for the first section </div>
              </div>

              <div className="flex-1 p-4 border-r border-gray-200">
                <h3 className="font-semibold mb-2 2 text-base">Error Level Analysis</h3>
                <div className="text-sm"> Content for the first section </div>
              </div>

              <div className="flex-1 p-5">
                <h3 className="font-semibold mb-2 text-base">Common tags</h3>
                <div className="flex flex-col gap-2 h-full">
                  {/* Upper Part */}
                  <div className="flex-1 text-sm">Content for the upper part</div>

                  {/* Bottom Part - Comment Section */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-semibold mb-2 text-base">Author Note</h4>
                    <textarea
                      className="flex-1 border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 text-sm"
                      placeholder="Write your comment here..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal_PReport;
