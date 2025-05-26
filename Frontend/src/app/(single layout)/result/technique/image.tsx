import React from 'react';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import TinEye from '@/assets/tineye-seeklogo.png';
interface ImageResultProps {
  img: string | null;
}

const Image_Result: React.FC<ImageResultProps> = ({ img }) => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-full p-5">
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
          style={{ height: '60%' }}
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
        <div>{t('No_Image_Available')}</div>
      )}

      <div className="absolute bottom-6 left-0 right-0 px-5 ">
        <ul className="flex flex-wrap gap-4 justify-center p-3 border-l-4 border-green-800 bg-green-50 rounded-md shadow-sm">
          <li>
            <a
              href="https://images.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white hover:bg-blue-100 text-blue-700 px-4 py-3 rounded shadow transition-colors"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="w-6 h-6"
              />
            </a>
          </li>

          {/* TinEye */}
          <li>
            <a
              href="https://tineye.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white hover:bg-gray-200 text-gray-800 px-4 py-3 rounded shadow transition-colors"
            >
              <Image src={TinEye} alt="TinEye" className="h-6 w-auto" />
            </a>
          </li>

          {/* Bing */}
          <li>
            <a
              href="https://www.bing.com/images"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white hover:bg-purple-200 text-purple-800 px-4 py-3 rounded shadow transition-colors"
            >
              <img
                src="https://www.bing.com/sa/simg/favicon-trans-bg-blue-mg.ico"
                alt="Bing"
                className="w-6 h-6"
              />
            </a>
          </li>

          {/* Yandex */}
          <li>
            <a
              href="https://yandex.com/images"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-3 rounded shadow transition-colors"
            >
              <img
                src="https://yandex.com/favicon.ico"
                alt="Yandex"
                className="w-6 h-6"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Image_Result;
