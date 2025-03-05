'use client';
import React, { useEffect, useRef, useState } from 'react';
import '@/app/(main layout)/upload/gridcss.css';
import { Poppins, Noto_Sans, Roboto_Mono } from 'next/font/google';

import { IoIosCloseCircle, IoMdMenu } from 'react-icons/io';
import { RiMindMap } from 'react-icons/ri';
import { FcMindMap } from 'react-icons/fc';
import { BiSolidBook } from 'react-icons/bi';

const poppins = Poppins({ subsets: ['latin'], weight: '700' });
const sourceCodePro = Roboto_Mono({ subsets: ['latin'], weight: '400' });

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

const scanTypes: Record<string, ScanType> = {
  normal: {
    list_of_algo: ['JPEG Ghost', 'DCA/LCA', 'JPEG Alignment'],
    description: 'Equipped with fast multiple layers of detection.',
  },
  deep: {
    list_of_algo: ['JPEG Ghost', 'DCA/LCA', 'JPEG Alignment', 'Reverse Search'],
    description:
      'Provide assessment with more complex algorithms to detect abnormalities.',
  },
  specialized: {
    list_of_algo: [
      'JPEG Ghost',
      'DCA/LCA',
      'JPEG Alignment',
      'Reverse Search',
      'EXIF Data',
    ],
    description:
      'Immerse yourself in a wide range of algorithms to choose and find the abnormalities by yourself.',
  },
};

const Method_Box: React.FC<MethodBoxProps> = ({
  id,
  label,
  isSelected,
  onSelect,
  duration,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentScan = scanTypes[id];

  return (
    <div
      className={
        id === 'specialized'
          ? 'specialized-scan-container'
          : 'normal-deep-scan-container'
      }
    >
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
            <div className="bg-white p-5 rounded shadow-lg w-96">
              {/* Header Section */}
              <div className="flex items-center mb-3">
                <div className="circle mr-4">
                  <BiSolidBook />
                </div>
                <h2 className="text-lg font-bold">List of Algorithms</h2>
                <div
                  className="ml-auto text-red-500 cursor-pointer"
                  onClick={toggleModal}
                >
                  <IoIosCloseCircle size={30} />
                </div>
              </div>

              <div className="separator mb-3"></div>

              {/* Grid Layout for Algorithms */}
              <div className="grid grid-cols-2 gap-3">
                {currentScan.list_of_algo.map((algo, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-3 rounded shadow-md text-center font-medium flex items-center justify-center h-12 overflow-hidden text-ellipsis whitespace-nowrap transition duration-300 ease-in-out transform hover:bg-blue-200 hover:scale-105 cursor-pointer"
                    title={algo} // Tooltip for longer names
                  >
                    {algo}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`font-normal text-sm p-2 ${sourceCodePro.className}`}>
        {currentScan ? currentScan.description : 'No description available.'}
      </div>
    </div>
  );
};

export default Method_Box;
