import React from 'react';
import Image from 'next/image';
import { FaLayerGroup } from 'react-icons/fa';
interface ElaResultProp {
  img: string | undefined; // Accept the image as a prop
  loading: boolean;
}

const ElaResult: React.FC<ElaResultProp> = ({ img, loading }) => {
  return (
    <div className="w-full h-full p-5">
      <div className="flex items-center">
        <div className="circle_2"> <FaLayerGroup /></div>
        <div className="font-bold text-lg ml-2 border-black border-b-2">Error Level Analysis (ELA) </div>
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

export default ElaResult;
