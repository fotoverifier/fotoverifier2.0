import React from 'react';
import Image from 'next/image';
interface TagResultProps {
  Tag: string | null; // Accept the image as a prop
}

const ImgTagging_Result: React.FC<TagResultProps> = ({ Tag }) => {
  return (
<div className='w-full h-full p-5'>
    <div className='flex'>
       <div className='circle_2'> 3. </div>
    <div className='font-bold text-lg ml-2 mb-5'>Image Tagging</div>
    </div>
     {Tag}
    </div>
  );
}

export default ImgTagging_Result;