import React, { useState } from 'react';
import Image from 'next/image';
import { FaLayerGroup } from 'react-icons/fa';
import Result from '@/assets/Group 79.svg';
import styles from '@/app/(single layout)/result/technique/categories.module.css';
import { MdWarning } from 'react-icons/md';
import { useLanguage } from '@/context/LanguageContext';
import MagnifierImage from './image_ss_copy/maginifier_image';

interface ElaResultProp {
  img: string | null;
  loading: boolean;
}

const ElaResult: React.FC<ElaResultProp> = ({ img, loading }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full h-full p-5 flex flex-col">
      <div className={styles.title_container}>
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center bg-slate-200 text-teal-800 rounded-full w-10 h-10 shadow-sm">
            <FaLayerGroup size={18} />
          </div>
          <h3 className="font-bold text-lg ml-3 text-teal-800">
            {t('Error_Level_Analysis')}
          </h3>
        </div>
      </div>
      <div
        className={`${styles.image_container} flex-1 flex items-center justify-center`}
      >
        {loading ? (
          <div className={styles.image_container}>
            <div className={styles.loadingBox}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>Please wait</p>
            </div>
          </div>
        ) : img ? (
          <>
            <div
              className="relative flex items-center justify-center p-2 w-full cursor-pointer group"
              style={{ height: '90%' }}
              onClick={() => setIsModalOpen(true)}
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

              <div className="absolute bottom-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Click to expand full screen and zoom in.
              </div>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                <div
                  className="relative bg-white rounded-lg overflow-hidden flex justify-center items-center"
                  style={{ width: '80vw', height: '80vh' }}
                >
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-black text-xl font-bold z-10"
                  >
                    &times;
                  </button>

                  <div className="w-fit h-fit flex items-center justify-center">
                    <MagnifierImage
                      src={img}
                      zoom={2}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <p>{t('No_Image_Available')}</p>
        )}
      </div>

      <div className="mt-auto mb-2 flex items-center gap-2 p-3 border-l-4 border-red-500 bg-red-100 rounded-md shadow-sm">
        <MdWarning className="text-red-600" size={20} />
        <p className="text-red-700 text-sm font-medium">
          {t('Tampered_Region_Bright')}
        </p>
      </div>
    </div>
  );
};

export default ElaResult;
