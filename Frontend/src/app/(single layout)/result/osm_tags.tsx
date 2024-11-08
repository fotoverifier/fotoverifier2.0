import React from 'react';
import Image from 'next/image';
interface ImageResultProps {
  img: string | null; // Accept the image as a prop
}

const ImgTagging_Result: React.FC<ImageResultProps> = ({ img }) => {
  return (
<div className='w-full h-full p-5'>
    <div className='flex'>
       <div className='circle_2'> 3. </div>
    <div className='font-bold text-lg ml-2 mb-5'>Image Tagging</div>
    </div>
      {img ? (
        <img src={img} alt="Result" className='h-5/6 w-5/6'/>// Display the image if it exists
      ) : (
        <p>No image available</p> // Fallback message
      )}
    </div>
  );
}

export default ImgTagging_Result;