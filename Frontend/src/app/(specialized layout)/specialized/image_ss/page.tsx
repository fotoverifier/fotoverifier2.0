'use client';
import React, { useState } from 'react';
import styles from './image_ss.module.css';
import { TbZoomInArea } from 'react-icons/tb';
import { IoGitNetworkOutline } from 'react-icons/io5';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const ImageSuperResolution = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.helper_title}>
          {}
          <div className={`${inter.className} ${styles.title_badge}`}>
            <div className={styles.circle}>
              {}
              <TbZoomInArea />
            </div>
            {}
            Image Super Resolution
          </div>
        </div>
        <button onClick={handleReset} className={styles.reset_button}>
          Reset All
        </button>{' '}
        {}
      </div>
      <div className={styles.content_area}>
        <div className={styles.section}>
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
              <div className={styles.control_group}>
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
                </div>
              </div>

              <div className={styles.control_group}>
                <label className={styles.control_label}>Model Type</label>
                <div className={styles.button_group}>
                  {[
                    'ESRGAN (Ex 1)',
                    'SRCNN (Ex 2)',
                    'EDSR (Ex 3)',
                    'RealESRGAN (Ex 4)',
                  ].map((model) => (
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
            </div>

            <div className={styles.image_preview_container}>
              <div className={styles.image_preview}>
                <div className={styles.preview_label}>Enhancement Preview</div>
                <div className={styles.preview_placeholder}>
                  <div className={styles.placeholder_text}>
                    Upscale: {upscaleFactor} | Model: {modelType}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSuperResolution;
