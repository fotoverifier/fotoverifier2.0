import React, { useEffect, useRef, useState } from "react";
import "@/app/(main layout)/upload/gridcss.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
interface MethodBoxProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}
const Method_Box: React.FC<MethodBoxProps> = ({ id, label, isSelected, onSelect }) => {
  return (
     <div className={id === "specialized" ? "specialized-scan-container" : "normal-deep-scan-container"}>
      <div className="button-title">
      <div className="circle-checkbox-container">
        <input
          type="checkbox"
          id={id}
          className="circle-checkbox"
          checked={isSelected} // Control checked state
          onChange={() => onSelect(id)} // Handle checkbox selection
        />
        <label htmlFor={id} className="circle-checkbox-label"></label>
      </div>
      {label}
    </div>
    </div>
  );
};

export default Method_Box;
