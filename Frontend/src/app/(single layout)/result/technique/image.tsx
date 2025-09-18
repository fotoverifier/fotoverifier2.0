import React from 'react';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import TinEye from '@/assets/tineye-seeklogo.png';
import styles from '@/app/(single layout)/result/technique/categories.module.css';

import NoImagePlaceholder from '@/components/exception_component/NoImagePlaceholder';
import { MdWarning } from 'react-icons/md';
interface ImageResultProps {
  img: any;
}

const Image_Result: React.FC<ImageResultProps> = ({ img }) => {
  const { t } = useLanguage();
  return (
    <div className="w-full h-full p-5 flex flex-col">
      <div className={styles.title_container}>
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center bg-slate-200 text-teal-800 rounded-full w-10 h-10 shadow-sm">
            <FaImage size={18} />
          </div>
          <h3 className="font-bold text-lg ml-3 text-teal-800">
            {t('Image_Information')}
          </h3>
        </div>
      </div>

      <div
        className={`${styles.image_container} flex-1 flex items-center justify-center`}
      >
        {img ? (
          <div
            className="flex items-center justify-center relative p-2 w-full"
            style={{ height: '60%' }}
          >
            <Image
              src={img}
              key={img}
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
          <NoImagePlaceholder />
        )}
      </div>

      <div className="mt-auto mb-2 flex items-center justify-center gap-2 p-2 border-l-4 border-green-800 bg-green-100 rounded-md shadow-sm">
        <div>
          <a
            href="https://images.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white hover:bg-blue-100 text-blue-700 px-4 py-3 rounded shadow transition-colors"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-6 h-6"
              width={0}
              height={0}
            />
          </a>
        </div>

        {/* TinEye */}
        <div>
          <a
            href="https://tineye.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white hover:bg-gray-200 text-gray-800 px-4 py-3 rounded shadow transition-colors"
          >
            <Image src={TinEye} alt="TinEye" className="h-6 w-auto" />
          </a>
        </div>

        <div>
          <a
            href="https://yandex.com/images"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-3 rounded shadow transition-colors"
          >
            <Image
              src="https://yandex.com/favicon.ico"
              alt="Yandex"
              className="w-6 h-6"
              width={0}
              height={0}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Image_Result;
