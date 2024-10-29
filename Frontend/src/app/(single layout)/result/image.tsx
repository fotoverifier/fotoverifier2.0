import React from 'react';
import Image from 'next/image';
interface ImageResultProps {
  img: string | null; // Accept the image as a prop
}

const Image_Result: React.FC<ImageResultProps> = ({ img }) => {
  return (
    <div className='image-result-container'>
      <div> Image </div>
      {img ? (
        <img src={img} alt="Result" className='h-5/6 w-5/6'/>// Display the image if it exists
      ) : (
        <p>No image available</p> // Fallback message
      )}
    </div>
  );
}

export default Image_Result;