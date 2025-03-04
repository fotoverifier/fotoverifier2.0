import { useState } from "react";
import { TbReportSearch } from "react-icons/tb";
import { TiExport } from "react-icons/ti";
import { FiHelpCircle } from "react-icons/fi";
import { FaSortUp, FaSortDown, FaTools, FaSearch, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Modal_PReport from "../modal/PReport_modal";
import pattern2 from "@/assets/Group 52.svg"
import "@/styles/head/head_result.css"
import "@/components/head/test.css"
const methods = [
  { name: "Basic Method", icon: <FaTools size={16} className="text-[#03564a]" /> },
  { name: "Deep Method", icon: <FaSearch size={16} className="text-[#03564a]" /> },
  { name: "Specialized Method", icon: <FaStar size={16} className="text-[#03564a]" /> }
];
interface HeaderReportProps {
  jpegResult: string[] | null;
  elaResult: string | null;
  tagResult: any | null;
  loadingJpegGhost: boolean;
  loadingEla: boolean;
  loadingTagResult: boolean;
}

const steps = [
  { id: "img", description: "This section displays the image you uploaded. Make sure it's the correct file before proceeding." },
  { id: "jpeg_ghost", description: "JPEG Ghost detection analyzes compression artifacts, helping identify potential edits in the image." },
  { id: "ela", description: "Error Level Analysis (ELA) highlights inconsistencies in image compression, revealing possible alterations." },
];




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

 const [currentStep, setCurrentStep] = useState(0);
  const [helpBox, setHelpBox] = useState<{ 
  text: string; 
  position: { top: number; left: number }; 
  description: string; 
} | null>(null);


const highlightSection = (stepIndex: number) => {
  if (stepIndex < 0 || stepIndex >= steps.length) {
    removeHighlight();
    return;
  }

  const target = document.getElementById(steps[stepIndex].id);

  if (target) {
    removeHighlight();
    target.classList.add("glow-effect");

    const rect = target.getBoundingClientRect();

    setHelpBox({
      text: `${stepIndex + 1}/${steps.length}`, 
      position: {
        top: window.scrollY + 15, 
        left: rect.left + window.scrollX + rect.width / 2 - 150, 
      },
      description: steps[stepIndex].description, 
    });
  }

  setCurrentStep(stepIndex);
};


    const removeHighlight = () => {
    steps.forEach((step) => {
      document.getElementById(step.id)?.classList.remove("glow-effect");
    });
    setHelpBox(null);
  };

  return (
    <div className="res_header_container flex items-center justify-between">
      <div className="text-2xl flex h-full items-center text-white px-6 py-3 rounded-lg gap-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-full bg-[#ffcc00] text-[#03564a] shadow-md flex items-center justify-center">
            <TbReportSearch size={28} />
          </div>
          <div className="font-bold text-white text-xl">General Report</div>
        </div>

        <div className="h-10 w-1 bg-white mx-5 rounded"></div>

         <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border-2 border-white p-2 rounded-full cursor-pointer bg-slate-200 text-gray-800 hover:bg-[#f0fdfa] hover:border-[#f0fdfa]  hover:text-[#03564a] transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
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
            className="absolute left-0 mt-2 w-56 bg-white border border-gray-300 rounded-sm shadow-lg"
          >
            {methods.map((method) => (
              <button
                key={method.name}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-800 transition-all duration-300 hover:bg-[#f0fdfa] hover:text-[#03564a] gap-2 text-left"
                onClick={() => {
                  setSelectedMethod(method.name);
                  setIsOpen(false);
                }}
              >
                {method.icon}
                {method.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
      </div>

      <div className="rounded-full bg-[#03564a] flex p-2 gap-4 shadow-lg mr-auto">
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

        <div className="relative group">
          <button
            className="border-2 border-white p-2 rounded-full cursor-pointer bg-transparent hover:bg-[#f0fdfa] hover:border-[#f0fdfa] text-white hover:text-[#03564a] transition-all duration-300 flex items-center justify-center shadow-md"
            onClick={() => highlightSection(currentStep)}

          >
            <FiHelpCircle size={20} />
          </button >
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            Need Help?
          </span>
        </div>

        {helpBox && (
          <>
            <div className="overlay" onClick={removeHighlight} />

            <div
              className="help-box"
              style={{
                top: `${helpBox.position.top}px`,
                left: `${helpBox.position.left}px`,
                position: "absolute",
                width: "300px",
                zIndex: 300,
              }}
            >
              <div className="help-description">
                {helpBox.description}
              </div>

              <div className="help-navigation">
                <button
                  className="nav-button"
                  onClick={() => highlightSection(currentStep - 1)}
                  disabled={currentStep === 0}
                >
                  {"<"}
                </button>

                <button className="help-button" onClick={removeHighlight}>
                  {helpBox.text}
                </button>

                <button
                  className="nav-button"
                  onClick={() => highlightSection(currentStep + 1)}
                  disabled={currentStep === steps.length - 1}
                >
                  {">"}
                </button>
              </div>
            </div>
          </>
        )}

      </div>

      <Image src={pattern2} alt="Header Image" height={300} width={300} className="res_header_image" />
    </div>
  );
};

export default HeaderReport;
