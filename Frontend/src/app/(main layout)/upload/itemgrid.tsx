import React, { useEffect, useRef, useState } from "react";
import "@/app/(main layout)/upload/gridcss.css";
import { Inter, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({subsets: ["latin"], weight: "300"});
interface MethodBoxProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  duration: string;
}
const description = []
const Method_Box: React.FC<MethodBoxProps> = ({ id, label, isSelected, onSelect, duration }) => {
  return (
     <div className={id === "specialized" ? "specialized-scan-container" : "normal-deep-scan-container"}>
      <div className="button-title">
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
 
      <div className="w-fit h-fit p-1.5 font-bold text-sm bg-gray-200 text-black">{duration}</div>
    </div>
      <div className={`font-normal text-sm p-2 ${poppins.className}`}>
    {id === "normal" && "Equipped with comprehensive and multiple layers of detection."}
    {id === "deep" && "Provide assessment with efficient and fast algorithms to detect abnormalities."}
    {id === "specialized" && "Immerse yourself in a wide range of algorithms to choose and find the abnormalities by yourself."}
  </div>
    </div>
  );
};

export default Method_Box;
