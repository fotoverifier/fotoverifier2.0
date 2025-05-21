'use client';
import React, { useState } from 'react';
import styles from './image_ss.module.css';
import { IoGitNetworkOutline } from 'react-icons/io5';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import MagnifierImage from './maginifier_image';

interface ImageSuperResolution_2Props {
  file: File | null; // ⬅️ CHANGE: Use File instead of blob URL
  previewUrl: string | null; // for image display
}

const ImageSuperResolution_2: React.FC<ImageSuperResolution_2Props> = ({
  file,
  previewUrl,
}) => {
  const { t } = useLanguage();
  const [upscaleFactor, setUpscaleFactor] = useState('4x');
  const [modelType, setModelType] = useState('ESRGAN');
  const [enhancedImg, setEnhancedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnhance = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setEnhancedImg(null);

      const formData = new FormData();
      formData.append('file', file);

      const scale = parseInt(upscaleFactor.replace('x', ''), 10);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-resolution?scale=${scale}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const { task_id } = await res.json();

      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/super-resolution-stream/?task_id=${task_id}&scale=${scale}`
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.status === 'done' && data.image) {
          setEnhancedImg(`data:image/png;base64,${data.image}`);
          setLoading(false);
          eventSource.close();
        } else if (data.status === 'error') {
          console.error(data.detail);
          setLoading(false);
          eventSource.close();
        }
      };

      eventSource.onerror = (err) => {
        console.error('SSE Error', err);
        setLoading(false);
        eventSource.close();
      };
    } catch (error) {
      console.error('Enhancement failed:', error);
      setLoading(false);
    }
  };

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
                  onClick={handleEnhance}
                >
                  {loading ? 'Processing...' : 'Enhance image'}
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

          {previewUrl ? (
            <>
              <div
                className="relative flex items-center justify-center p-2 w-full cursor-pointer group"
                style={{ height: '90%' }}
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={previewUrl}
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

                    <div className="w-fit h-fit flex items-center justify-center">
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
            <div>{t('No_Image_Available')}</div>
          )}
        </div>

        <div className={styles.image_preview_container}>
          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <IoGitNetworkOutline />
            </div>
            <h2 className={`${styles.section_title} ${inter.className}`}>
              Enhance image
            </h2>
          </div>
          {enhancedImg ? (
            <div
              className="flex items-center justify-center relative p-2 w-full"
              style={{ height: '90%' }}
            >
              <Image
                src={enhancedImg}
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
            </div>
          ) : (
            <div className="h-full w-full">
              <div className={styles.preview_placeholder}>
                <div className={styles.placeholder_text}>
                  {loading
                    ? 'Processing...'
                    : `Upscale: ${upscaleFactor} | Model: ${modelType}`}
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
