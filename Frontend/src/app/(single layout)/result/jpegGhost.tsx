import React from 'react';
import Image from 'next/image';
import { SiJpeg } from 'react-icons/si';
interface ImageResultProps {
  img: string | undefined; // Accept the image as a prop
  loading: boolean;
}

const JpegGhostResult: React.FC<ImageResultProps> = ({ img, loading }) => {
  return (
    <div className="w-full h-full p-5">
      <div className="flex">
        <div className="circle_2"> <SiJpeg /></div>
        <div className="font-bold text-lg ml-2 mb-5  border-black border-b-2">JPEG Ghost</div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : img ? (
        <img src={img} alt="Result" className="h-5/6 w-5/6" /> // Display the image if it exists
      ) : (
        <p>No image available</p> // Fallback message
      )}
    </div>
  );
};

export default JpegGhostResult;
