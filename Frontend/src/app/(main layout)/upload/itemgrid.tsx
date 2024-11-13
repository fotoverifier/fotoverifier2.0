"use client";
import React, { useEffect, useRef, useState } from "react";
import "@/app/(main layout)/upload/gridcss.css";
import { Inter, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({subsets: ["latin"], weight:"700"});
import { IoMdMenu } from "react-icons/io";

interface MethodBoxProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  duration: string;
}
interface ScanType {
  list_of_algo: string[];
  description: string;
}

// Define the type for the scanTypes object, where each key is a string that maps to a ScanType
const scanTypes: Record<string, ScanType> = {
  normal: {
    list_of_algo: ["JPEG Ghost", "DCA/LCA", "JPEG Alignment"],
    description: "Equipped with comprehensive and multiple layers of detection."
  },
  deep: {
    list_of_algo: ["JPEG Ghost", "DCA/LCA", "JPEG Alignment", "Reverse Image Search"],
    description: "Provide assessment with efficient and fast algorithms to detect abnormalities."
  },
  specialized: {
    list_of_algo: ["JPEG Ghost", "DCA/LCA", "JPEG Alignment", "Reverse Image Search", "EXIF Data"],
    description: "Immerse yourself in a wide range of algorithms to choose and find the abnormalities by yourself."
  }
};


const Method_Box: React.FC<MethodBoxProps> = ({ id, label, isSelected, onSelect, duration }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const currentScan = scanTypes[id];

  return (
     <div className={id === "specialized" ? "specialized-scan-container" : "normal-deep-scan-container"}>
      <div className={`button-title ${poppins.className}`}>
      <div className="circle-checkbox-container">
        <input
          type="checkbox"
          id={id}
          className="circle-checkbox"
          checked={isSelected}
          onChange={() => onSelect(id)} 
        />
        <label htmlFor={id} className="circle-checkbox-label"></label>
             <div className="ml-3">{label}</div>
      </div>
        <IoMdMenu className="cursor-pointer" onClick={toggleModal} />

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded shadow-lg w-80">
              <h2 className="text-lg font-bold mb-3">List of Algorithms</h2>
              <div>
                {currentScan.list_of_algo.map((algo: any, index: any) => (
                  <p key={index}>{algo}</p>
                ))}
              </div>
              <button 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
    <div className="font-normal text-sm p-2">
        {currentScan ? currentScan.description : "No description available."}
      </div>
    </div>
  );
};

export default Method_Box;
