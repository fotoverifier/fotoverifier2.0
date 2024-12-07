import React from 'react';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
interface ImageResultProps {
  img: string | null; // Accept the image as a prop
}

const Image_Result: React.FC<ImageResultProps> = ({ img }) => {
  return (
<div className='w-full h-full p-5'>
    <div className='flex'>
       <div className='circle_2'> <FaImage /> </div>
    <div className="font-bold text-lg ml-2 mb-5  border-black border-b-2">Image</div>
    </div>
      {img ? (
        <Image src={img} alt="Result" className='h-5/6 w-5/6'/>// Display the image if it exists
      ) : (
        <div>No image available</div> // Fallback message
      )}
    </div>
  );
};

export default Image_Result;
