"use client"
import React, { useState } from 'react'
import "@/app/(single layout)/libraries/libraries.css";
import { IoIosSearch } from "react-icons/io";

const Libraries = () => {
  const categories = [
    "Meta-data Analysis",
     "Computational Photography ",
     "Tampering detection",
     "Optical/Physical",

  ];
  const links = ["upload", "link2", "link3", "link4", "link5", "link6"];
  const [activeTab, setActiveTab] = useState('General');
  return (
    
    <div className="libraries-container">
        <div className="tab-area font-bold flex items-center">
        {categories.map((category) => (
          <button
            key={category}
            className={activeTab === category ? "tab active" : "tab"}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="content-area">
        {activeTab === "Meta-data Analysis" && (
          <div className="w-full h-full flex flex-col justify-evenly">
            <div className="show-container">Meta-data Analysis Content</div>
          </div>
        )}
        {activeTab === "Computational Photography" && (
          <div className="w-full h-full flex flex-col justify-evenly">
            <div className="show-container">Computational Photography Content</div>
          </div>
        )}
        {activeTab === "Tampering detection" && (
          <div className="w-full h-full flex flex-col justify-evenly">
            <div className="show-container">Tampering Detection Content</div>
          </div>
        )}
        {activeTab === "Optical/Physical" && (
          <div className="w-full h-full flex flex-col justify-evenly">
            <div className="show-container">Optical/Physical Content</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Libraries