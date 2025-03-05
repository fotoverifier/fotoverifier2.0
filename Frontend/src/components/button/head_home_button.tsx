'use client';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa';
const HH_Button = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsMenuOpen(false);
  };

  const handleIconClick = (e: any) => {
    e.stopPropagation();
    setIsMenuOpen(true);
    console.log('Icon clicked!');
  };

  const handleButtonClick = () => {
    // Button's action (e.g., navigation)
    setIsMenuOpen(true);
    console.log('Button clicked!');
  };

  return (
    <button
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Resources
      <span onClick={handleIconClick} className="ml-5">
        {isMenuOpen ? <FaAngleUp /> : <FaAngleDown />}
      </span>
    </button>
  );
};

export default HH_Button;
