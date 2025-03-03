import { useState } from "react";
import { TbReportSearch } from "react-icons/tb";
import { TiExport } from "react-icons/ti";
import { FiHelpCircle } from "react-icons/fi";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal_PReport from "../modal/PReport_modal";
import pattern2 from "@/assets/Group 52.svg"
import "@/styles/head/head_result.css"
const methods = ["Basic Method", "Deep Method", "Specialized Method"];

interface HeaderReportProps {
  jpegResult: string[] | null;
  elaResult: string | null;
  tagResult: any | null;
  loadingJpegGhost: boolean;
  loadingEla: boolean;
  loadingTagResult: boolean;
}


const HeaderReport: React.FC<HeaderReportProps> = ({
  jpegResult,
  elaResult,
  tagResult,
  loadingJpegGhost,
  loadingEla,
  loadingTagResult,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("Basic Method");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="res_header_container flex items-center justify-between">
      {/* Left Section - Title & Method Dropdown */}
      <div className="text-2xl flex h-full items-center text-white px-6 py-3 rounded-lg gap-6">
        {/* Report Title */}
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-[#ffcc00] text-[#03564a] shadow-md flex items-center justify-center">
            <TbReportSearch size={28} />
          </div>
          <div className="font-bold text-white text-xl">General Report</div>
        </div>

        {/* Divider */}
        <div className="h-10 w-1 bg-white mx-5 rounded"></div>

        {/* Method Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="border-2 border-white p-2 rounded-full cursor-pointer bg-transparent hover:bg-[#f0fdfa] hover:border-[#f0fdfa] text-white hover:text-[#03564a] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
          >
            <span className="text-lg">{selectedMethod}</span>
            {isOpen ? <FaSortUp size={20} className="mt-2" /> : <FaSortDown size={20} className="mb-2" />}
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
              >
                {methods.map((method) => (
                  <button
                    key={method}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-[#f0fdfa] hover:text-[#03564a] transition-all duration-300 text-sm"
                    onClick={() => {
                      setSelectedMethod(method);
                      setIsOpen(false);
                    }}
                  >
                    {method}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Section - Buttons */}
      <div className="rounded-full bg-[#03564a] flex p-2 gap-4 shadow-lg mr-auto">
        {/* Export Button */}
        <div className="relative group">
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-white p-2 rounded-full cursor-pointer bg-transparent hover:bg-[#f0fdfa] hover:border-[#f0fdfa] text-white hover:text-[#03564a] transition-all duration-300 flex items-center justify-center shadow-md"
          >
            <TiExport size={20} />
          </button>

          <Modal_PReport
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            jpegResult={jpegResult}
            elaResult={elaResult}
            tagResult={tagResult}
            loadingJpegGhost={loadingJpegGhost}
            loadingEla={loadingEla}
            loadingTagResult={loadingTagResult}
          />

          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            Generate a portable report
          </span>
        </div>

        {/* Help Button */}
        <div className="relative group">
          <button
            className="border-2 border-white p-2 rounded-full cursor-pointer bg-transparent hover:bg-[#f0fdfa] hover:border-[#f0fdfa] text-white hover:text-[#03564a] transition-all duration-300 flex items-center justify-center shadow-md"
          >
            <FiHelpCircle size={20} />
          </button>
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            Need Help?
          </span>
        </div>
      </div>

      {/* Header Image */}
      <Image src={pattern2} alt="Header Image" height={300} width={300} className="res_header_image" />
    </div>
  );
};

export default HeaderReport;
