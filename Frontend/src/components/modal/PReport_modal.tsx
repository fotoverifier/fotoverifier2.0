import React, { useRef } from 'react';
import { toPng, toJpeg } from 'html-to-image';
import JpegGhostResult from '@/app/(single layout)/result/technique/jpegGhost';
import ElaResult from '@/app/(single layout)/result/technique/ela';
import ImgTagging_Result from '@/app/(single layout)/result/technique/osm_tags';
import { FiEdit } from 'react-icons/fi';
import Image_Result from '@/app/(single layout)/result/technique/image';

interface ModalPReportProps {
  isOpen: boolean;
  closeModal: () => void;
  jpegResult?: string[] | null;
  elaResult: string | null;
  tagResult: any | null;
  loadingJpegGhost: boolean;
  loadingEla: boolean;
  loadingTagResult: boolean;
}

const Modal_PReport: React.FC<ModalPReportProps> = ({
  isOpen,
  closeModal,
  jpegResult,
  elaResult,
  tagResult,
  loadingJpegGhost,
  loadingEla,
  loadingTagResult,
}) => {
  const contentRef = useRef<HTMLDivElement>(null); // Reference only for content section

  const handleExport = (format: 'png' | 'jpeg') => {
    if (contentRef.current) {
      const exportFunction = format === 'png' ? toPng : toJpeg;

      exportFunction(contentRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `content-section.${format}`;
          link.click();
        })
        .catch((error) => {
          console.error('Error exporting image:', error);
        });
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 h-screen text-black">
          <div className="bg-white rounded-lg w-[95%] h-[90%] p-6 flex flex-col">
            {}
            <div className="flex items-center text-base mb-4">
              <div className="text-large font-bold border-2 border-green-800 rounded-lg px-4 py-2 text-black self-center">
                General Report
              </div>

              {}
              <div className="ml-4 flex space-x-2">
                <div
                  onClick={() => handleExport('png')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer"
                >
                  Export PNG
                </div>
                <div
                  onClick={() => handleExport('jpeg')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 cursor-pointer"
                >
                  Export JPEG
                </div>
              </div>

              {}
              <div
                onClick={closeModal}
                className="ml-auto bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition duration-300"
              >
                ×
              </div>
            </div>

            {}
            <div
              className="flex flex-1 border-t pt-4 text-lg bg-white"
              ref={contentRef}
            >
              {}
              <div className="flex-1 border-r border-gray-200 text-base">
                <JpegGhostResult
                  images={jpegResult ?? null}
                  loading={loadingJpegGhost}
                />
              </div>

              <div className="flex-1 border-r border-gray-200 text-base">
                <JpegGhostResult
                  images={jpegResult ?? null}
                  loading={loadingJpegGhost}
                />
              </div>

              {}
              <div className="flex-1 border-r border-gray-200 text-base">
                <ElaResult
                  img={`data:image/jpeg;base64,${elaResult}`}
                  loading={loadingEla}
                />
              </div>

              {}
              <div className="flex-1 p-5 ">
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col gap-2 h-full w-full text-base">
                    {}
                    <div className="h-2/3 flex  items-center justify-center">
                      <ImgTagging_Result
                        Tag={tagResult}
                        loading={loadingTagResult}
                      />
                    </div>

                    {}
                    <div className="flex-1 flex flex-col h-1/3 border rounded-lg shadow-md p-4 bg-gray-50">
                      {}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <FiEdit className="text-blue-500" size={18} />
                          <h4 className="font-semibold text-lg text-gray-800">
                            Author Note
                          </h4>
                        </div>
                      </div>

                      {}
                      <textarea
                        className="flex-1 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white placeholder-gray-400"
                        placeholder="Write your comment here..."
                      ></textarea>
                    </div>
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
