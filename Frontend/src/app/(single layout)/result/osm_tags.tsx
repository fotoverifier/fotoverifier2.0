import React from 'react';
import Image from 'next/image';
import { IoIosPricetag } from 'react-icons/io';
interface TagResultProps {
  Tag: string | null; // Accept the image as a prop
  loading: boolean;
}

const ImgTagging_Result: React.FC<TagResultProps> = ({ Tag, loading }) => {
  return (
    <div className="striped-background w-full h-full p-5">
      <div className="flex">
        <div className="circle_2"> <IoIosPricetag /> </div>
        <div className="font-bold text-lg ml-2 mb-5">Image Tagging</div>
      </div>
      {loading ? <p>Loading...</p> : Tag }
    </div>
  );
};

export default ImgTagging_Result;
