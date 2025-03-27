import React from 'react';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
interface ImageResultProps {
  img: string | null;
}

const Image_Result: React.FC<ImageResultProps> = ({ img }) => {
  return (
    <div className="w-full h-full p-5">
      <div className="flex">
        <div className="circle_2">
          {' '}
          <FaImage />{' '}
        </div>
        <div className="font-bold text-lg ml-2 mb-5">Image</div>
      </div>
      {img ? (
        <div
          className="flex items-center justify-center relative p-2 w-full"
          style={{ height: '90%' }}
        >
          <Image
            src={img}
            alt="Result"
            className="image-preview"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: 'auto',
              maxWidth: '100%',
              height: '100%',
              objectFit: 'contain',
              position: 'relative',
            }}
          />
        </div>
      ) : (
        <div>No image available</div> // Fallback message
      )}
    </div>
  );
};

export default Image_Result;
