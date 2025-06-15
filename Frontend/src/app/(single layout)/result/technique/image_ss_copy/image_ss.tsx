'use client';
import React, { useState } from 'react';
import styles from './image_ss.module.css';
import { IoGitNetworkOutline, IoImage, IoImageSharp } from 'react-icons/io5';
import { Inter, Montserrat } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import MagnifierImage from './maginifier_image';
import { MdCameraEnhance } from 'react-icons/md';
import { FiImage } from 'react-icons/fi';
import NoImagePlaceholder from '@/components/exception_component/NoImagePlaceholder';
import Loadable from 'next/dist/shared/lib/loadable.shared-runtime';
import LoadingOverlay from '@/components/loading/loadinganimation';


const montserrat = Montserrat({subsets: ["latin"]})
interface ImageSuperResolutionProps {
  previewUrl: string | null;
  handleEnhance: (upscaleFactor: string) => Promise<void>;
  superResolutionResult: string | null;
  loading: boolean;
}

const ImageSuperResolution_2 = ({
  previewUrl,
  handleEnhance,
  superResolutionResult,
  loading,
}: ImageSuperResolutionProps) => {
  const { t } = useLanguage();
  const [upscaleFactor, setUpscaleFactor] = useState('4x');
  const [modelType, setModelType] = useState('ESRGAN');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

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
  return (
    <div className={`styles.container h-full ${montserrat.className} font-bold`}>
      <div className={styles.content_area}>
        <div className={styles.section}>
    

          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <IoGitNetworkOutline />
            </div>
            <h2 className={`${styles.section_title} ${montserrat.className}`}>
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

              <div className="my-4 border-t border-gray-300 w-full" />

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

              <div className="my-4 border-t border-gray-300 w-full" />

              <div className="flex">
                <button
                  className={styles.enhance_button}
                  onClick={() => handleEnhance(upscaleFactor)}
                >
                  Enhance image
                </button>{' '}
              </div>
            </div>
          </div>
        </div>



        <div className={styles.section}>
    

        <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <IoImage />
            </div>
            <h2 className={`${styles.section_title} ${montserrat.className}`}>
              Original Image
            </h2>
          </div>

          {previewUrl ? (
            <>
              <div
                className="relative flex items-center justify-center p-2 w-full cursor-pointer group"
                style={{ height: '90%' }}
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={previewUrl}
                  key={previewUrl}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 h-screen w-screen">
                  <div
                    className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center w-3/4 h-3/4"
                  >
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-2 right-2 text-black text-xl font-bold z-10"
                    >
                      &times;
                    </button>

                    <div className="w-fit h-fit">
                      <MagnifierImage
                        src={previewUrl}
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
          <NoImagePlaceholder></NoImagePlaceholder>
          )}
      
        </div>


    

        <div className={styles.section}>
          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
            <MdCameraEnhance />
            </div>  
            <h2  className={`${styles.section_title} ${montserrat.className}`}>
              Enhance image
            </h2>
          </div>
          {superResolutionResult ? (
            <>
              <div
                className="flex items-center justify-center relative p-2 w-full"
                style={{ height: '90%' }}
                onClick={() => setIsModalOpen2(true)}
              >
                <Image
                  src={superResolutionResult}
                  alt="Enhanced Result"
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
              {isModalOpen2 && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 h-screen w-screen">
               <div
                 className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center w-3/4 h-3/4"
               >
                 <button
                   onClick={() => setIsModalOpen2(false)}
                   className="absolute top-2 right-2 text-black text-xl font-bold z-10"
                 >
                   &times;
                 </button>

                  <div className="w-[90%] h-[90%]">
                   <MagnifierImage
                     src={superResolutionResult}
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
            <div className="h-full w-full">
              <div className={styles.preview_placeholder}>
                <div className={styles.placeholder_text}>
                  <LoadingOverlay message='Enhancing in progress'/>
                  
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageSuperResolution_2;
