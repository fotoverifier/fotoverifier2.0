import React, { useEffect, useRef, useState } from "react";
import { FaBeer, FaCoffee, FaApple, FaCar } from "react-icons/fa"; // Example icons
import { CiCircleInfo } from "react-icons/ci";
import { IoIosPhotos } from "react-icons/io";
import { TbEyeSearch } from "react-icons/tb";
import { PiCheckerboard } from "react-icons/pi";
import "@/app/(single layout)/upload/gridcss.css";
import { FaAnglesDown, FaAngleUp } from "react-icons/fa6";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const items = [
  { id: 1, name: "Meta-data Analysis", icon: <CiCircleInfo size={24} /> },
  { id: 2, name: "Computational", icon: <IoIosPhotos size={24} /> },
  { id: 3, name: "Tampering detection", icon: <PiCheckerboard size={24} /> },
  { id: 4, name: "Optical/Physical", icon: <TbEyeSearch size={24} /> },
];

const ItemGrid = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [containerHeight, setContainerHeight] = useState("auto");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerHeight(`${containerRef.current.scrollHeight}px`);
    }
  }, [isExpanded]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out bg-white"
        style={{ height: isExpanded ? containerHeight : "0" }} // Adjust the height as needed
      >
        <div className="grid grid-cols-2 gap-4 p-4" ref={containerRef}>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center border-2 border-black p-4 rounded-lg hover:shadow-xl push-effect"
            >
              <div className="mb-2">{item.icon}</div>
              <div className="text-sm font-semibold">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleToggle}
        className="text-white border-[#099B85] bg-[#099B85] hover:bg-[#01584B] border-0 w-fit mt-4 flex align-middle justify-center" // Adjust the margin-top as needed
      >
        {isExpanded ? (
          <FaAngleUp size={30}></FaAngleUp>
        ) : (
          <div className="flex">
            <FaAnglesDown size={30} />
            <div className={`ml-2 ${inter.className}`}>
              {" "}
              Explore categories and benchmarks
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default ItemGrid;
