import React from 'react';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
interface ImageResultProps {
  img: string | null;
}

const Image_Result: React.FC<ImageResultProps> = ({ img }) => {
  const {t} = useLanguage();
  return (
    <div className="w-full h-full p-5">
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center bg-slate-200 text-teal-800 rounded-full w-10 h-10 shadow-sm">
          <FaImage size={18} />
        </div>
        <h3 className="font-bold text-lg ml-3 text-teal-800">
          {t('Image_Information')}
        </h3>
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
        <div>{t('No_Image_Available')}</div> // Fallback message
      )}
    </div>
  );
};

export default Image_Result;
