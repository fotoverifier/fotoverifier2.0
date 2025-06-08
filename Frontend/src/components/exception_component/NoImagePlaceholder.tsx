import { useLanguage } from '@/context/LanguageContext';
import React from 'react';
import { FiImage } from 'react-icons/fi';

const NoImagePlaceholder: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-fit h-fit p-4 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center text-gray-500 bg-gray-50">
        <FiImage className="text-4xl mb-2" />
        <span className="text-base font-medium">{t('No_Image_Available')}</span>
      </div>
    </div>
  );
};

export default NoImagePlaceholder;