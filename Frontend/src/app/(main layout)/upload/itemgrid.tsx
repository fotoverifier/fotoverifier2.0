'use client';
import React, { useEffect, useRef, useState } from 'react';
import '@/app/(main layout)/upload/gridcss.css';
import { Poppins, Noto_Sans, Roboto_Mono } from 'next/font/google';

import { IoIosCloseCircle, IoMdMenu } from 'react-icons/io';
import { FaCode } from 'react-icons/fa';
import { MdChevronRight } from 'react-icons/md';
import { BiSolidBook } from 'react-icons/bi';
import { useLanguage } from '@/context/LanguageContext';

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

const Method_Box: React.FC<MethodBoxProps> = ({
  id,
  label,
  isSelected,
  onSelect,
  duration,
}) => {
  const { t } = useLanguage();
  const scanTypes: Record<string, ScanType> = {
    normal: {
      list_of_algo: ['JPEG Ghost', 'DCA/LCA', 'JPEG Alignment'],
      description: t('upload_normal_description'),
    },
    specialized: {
      list_of_algo: [
        'JPEG Ghost',
        'DCA/LCA',
        'JPEG Alignment',
        'Reverse Search',
        'EXIF Data',
      ],
      description: t('upload_specialized_description'),
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentScan = scanTypes[id];

  const [isHovered, setIsHovered] = useState(false);

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
        <div
          className={`flex items-center font-semibold text-sm
                  bg-gradient-to-r from-teal-800 to-teal-700 hover:from-teal-700 hover:to-teal-600
                  text-white shadow-md rounded-lg px-1.5 py-1.5 transition-all duration-500
                  border-l-4 border-yellow-400 hover:border-yellow-500`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleModal}
        >
          <svg
            className="w-5 h-5 text-white cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${
              isHovered ? 'opacity-100 max-w-32 ml-2' : 'opacity-0 max-w-0 ml-0'
            }`}
          >
            {t('Techniques')}
          </span>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-300 transform scale-100">
              {}
              <div className="bg-gradient-to-r from-teal-800 to-teal-700 p-4 flex items-center">
                <div className="bg-yellow-400 p-2 rounded-full mr-3 text-teal-800">
                  <BiSolidBook size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">
                  List of Algorithms
                </h2>
                <div
                  className="ml-auto text-white bg-opacity-20 hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors duration-200"
                  onClick={toggleModal}
                >
                  <IoIosCloseCircle size={24} />
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
                  {currentScan.list_of_algo.map((algo, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm 
                              border-l-4 border-teal-600 
                              font-medium flex items-center 
                              transition duration-300 ease-in-out transform 
                              hover:bg-teal-50 dark:hover:bg-teal-900 hover:shadow-md 
                              cursor-pointer group"
                      title={algo}
                    >
                      <FaCode size={18} className="text-teal-600 mr-3" />
                      <span className="text-gray-800 dark:text-gray-200">
                        {algo}
                      </span>
                      <MdChevronRight
                        size={18}
                        className="ml-auto text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
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
