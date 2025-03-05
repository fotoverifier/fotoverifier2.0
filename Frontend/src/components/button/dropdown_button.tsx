'use client';
import React, { useState } from 'react';

interface DropDownProps {
  title: string;
  array: string[];
}

const DropdownButton: React.FC<DropDownProps> = ({ title, array }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(title);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white bg-transparent px-4 py-2 border-none hover:border-none"
      >
        <span className="hover:transition-transform hover:transform hover:scale-105">
          {selectedOption}
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute bg-white border border-gray-300 mt-2 rounded-md shadow-md"
          style={{ minWidth: 'max-content' }}
        >
          {array.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap text-black"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;
