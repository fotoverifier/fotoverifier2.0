'use client';
import React, { useState } from 'react';
import styles from './image_ss.module.css';
import { TbZoomInArea } from 'react-icons/tb';
import { IoGitNetworkOutline } from 'react-icons/io5';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import MagnifierImage from './maginifier_image';
interface ImageResultProps {
  img: string | null;
}

const ImageSuperResolution_2: React.FC<ImageResultProps> = ({ img }) => {
  const { t } = useLanguage();
  const [upscaleFactor, setUpscaleFactor] = useState('4x');
  const [modelType, setModelType] = useState('ESRGAN');

  const handleUpscaleFactorChange = (factor: string) => {
    setUpscaleFactor(factor);
  };

  const handleModelTypeChange = (type: string) => {
    setModelType(type);
  };

  const handleReset = () => {
    setUpscaleFactor('4x');
    setModelType('ESRGAN');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  
  return (
    <div className={styles.container}>
      <div className={styles.content_area}>
        <div className={styles.section}>
          {/*<div className={styles.helper_title}>
          <div className={${inter.className} ${styles.title_badge}}>
            <div className={styles.circle}>
              <TbZoomInArea />
            </div>
            Image Super Resolution
          </div>
        </div>*/}

          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <IoGitNetworkOutline />
            </div>
            <h2 className={`${styles.section_title} ${inter.className}`}>
              Resolution Enhancement
            </h2>
          </div>

          <div className={styles.section_content}>
            <div className={styles.control_group_container}>
              <div className={`${styles.control_group} flex`}>
                <label className={styles.control_label}>Upscale Factor</label>
                <div className={styles.button_group}>
                  {['2x', '4x', '8x'].map((factor) => (
                    <button
                      key={factor}
                      className={`${styles.option_button} ${upscaleFactor === factor ? styles.active : ''}`}
                      onClick={() => handleUpscaleFactorChange(factor)}
                    >
                      {factor}
                    </button>
                  ))}
                  <button onClick={handleReset} className={styles.reset_button}>
                    Reset All
                  </button>{' '}
                </div>
              </div>

              <div className={styles.control_group}>
                <label className={styles.control_label}>Model Type</label>
                <div className={styles.button_group}>
                  {['ESRGAN', 'SRCNN', 'EDSR ', 'RealESRGAN'].map((model) => (
                    <button
                      key={model}
                      className={`${styles.option_button} ${modelType === model ? styles.active : ''}`}
                      onClick={() => handleModelTypeChange(model)}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex">
                <button className={styles.enhance_button}>
                  Enhance image
                </button>{' '}
              </div>
            </div>
          </div>
        </div>

        <div className={` ${styles.image_preview_container}`}>
          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <IoGitNetworkOutline />
            </div>
            <h2 className={`${styles.section_title} ${inter.className}`}>
              Original Image
            </h2>
          </div>

          {img ? (
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
                   className="relative bg-white rounded-lg overflow-hidden"
                   style={{ width: '80vw', height: '80vh' }}
                 >
                   <button
                     onClick={() => setIsModalOpen(false)}
                     className="absolute top-2 right-2 text-black text-xl font-bold z-10"
                   >
                     &times;
                   </button>
       
                   <div className="w-full h-full flex items-center justify-center">
                   <MagnifierImage src={img} zoom={2} width="100%" height="100%" />

                   </div>
                 </div>
               </div>
             )}
           </>
          ) : (
            <div>{t('No_Image_Available')}</div> 
          )}
        </div>

        
        <div className={styles.image_preview_container}>
          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <IoGitNetworkOutline />
            </div>
            <h2 className={`${styles.section_title} ${inter.className}`}>
              Enhanced Image
            </h2>
          </div>
          { img ? (
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
            <div className='h-full w-full'>   <div className={styles.preview_placeholder}>
                  <div className={styles.placeholder_text}>
                    Upscale: {upscaleFactor} | Model: {modelType}
                  </div>
                </div> 
                </div> // Fallback message
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSuperResolution_2;
