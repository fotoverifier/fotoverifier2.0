'use client';
import React, { useState } from 'react';
import styles from './reflection.module.css';
import { Inter } from 'next/font/google';
import { CiLight } from 'react-icons/ci';
import { FaSliders, FaWaveSquare } from 'react-icons/fa6';
import { MdOutlineTonality } from 'react-icons/md';
const inter = Inter({ subsets: ['latin'] });

const Specialized_Reflect = () => {
  const [noiseLevel, setNoiseLevel] = useState(20);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(100);
  const [kernelSize, setKernelSize] = useState('3');
  const [noiseType, setNoiseType] = useState('Gaussian');

  const handleNoiseLevelChange = (e: any) => {
    setNoiseLevel(e.target.value);
  };

  const handleBrightnessChange = (e: any) => {
    setBrightness(e.target.value);
  };

  const handleContrastChange = (e: any) => {
    setContrast(e.target.value);
  };

  const handleKernelSizeChange = (e: any) => {
    setKernelSize(e.target.value);
  };

  const handleNoiseTypeChange = (type: any) => {
    setNoiseType(type);
  };

  const handleReset = () => {
    setNoiseLevel(20);
    setBrightness(0);
    setContrast(100);
    setKernelSize('3');
    setNoiseType('Gaussian');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.helper_title}>
          <div className={`${inter.className} ${styles.title_badge}`}>
            <div className={styles.circle}>
              <CiLight />
            </div>
            Reflection Method
          </div>
        </div>
      </div>

      <div className={styles.content_area}>
        <div className={styles.section}>
          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <FaWaveSquare />
            </div>
            <h2 className={`${styles.section_title} ${inter.className}`}>
              Noise Modification
            </h2>
          </div>

          <div className={styles.section_content}>
            <div className={styles.control_group}>
              <label className={styles.control_label}>Noise Level</label>
              <div className={styles.slider_container}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={noiseLevel}
                  onChange={handleNoiseLevelChange}
                  className={styles.slider}
                />
                <span className={styles.value_display}>{noiseLevel}%</span>
              </div>
            </div>

            <div className={styles.control_group}>
              <label className={styles.control_label}>Noise Type</label>
              <div className={styles.button_group}>
                <button
                  className={`${styles.option_button} ${noiseType === 'Gaussian' ? styles.active : ''}`}
                  onClick={() => handleNoiseTypeChange('Gaussian')}
                >
                  Gaussian
                </button>
                <button
                  className={`${styles.option_button} ${noiseType === 'Salt & Pepper' ? styles.active : ''}`}
                  onClick={() => handleNoiseTypeChange('Salt & Pepper')}
                >
                  Salt & Pepper
                </button>
                <button
                  className={`${styles.option_button} ${noiseType === 'Speckle' ? styles.active : ''}`}
                  onClick={() => handleNoiseTypeChange('Speckle')}
                >
                  Speckle
                </button>
              </div>
            </div>

            <div className={styles.control_group}>
              <label className={styles.control_label}>Kernel Size</label>
              <div className={styles.select_container}>
                <select
                  className={styles.select_control}
                  value={kernelSize}
                  onChange={handleKernelSizeChange}
                >
                  <option value="3">3x3</option>
                  <option value="5">5x5</option>
                  <option value="7">7x7</option>
                </select>
              </div>
            </div>

            <div className={styles.image_preview}>
              <div className={styles.preview_label}>Noise Analysis</div>
              <div className={styles.preview_placeholder}>
                <div className={styles.placeholder_text}>
                  Level: {noiseLevel}% | Type: {noiseType} | Kernel:{' '}
                  {kernelSize}x{kernelSize}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.section_header}>
            <div className={styles.circle_secondary}>
              <MdOutlineTonality />
            </div>
            <h2 className={`${styles.section_title} ${inter.className}`}>
              Luminance Gradient
            </h2>
          </div>

          <div className={styles.section_content}>
            <div className={styles.control_group}>
              <label className={styles.control_label}>Brightness</label>
              <div className={styles.slider_container}>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={brightness}
                  onChange={handleBrightnessChange}
                  className={styles.slider}
                />
                <span className={styles.value_display}>{brightness}</span>
              </div>
            </div>

            <div className={styles.control_group}>
              <label className={styles.control_label}>Contrast</label>
              <div className={styles.slider_container}>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={handleContrastChange}
                  className={styles.slider}
                />
                <span className={styles.value_display}>{contrast}%</span>
              </div>
            </div>

            <div className={styles.control_group}>
              <label className={styles.control_label}>Gradient Map</label>
              <div className={styles.color_map}>
                <div className={styles.gradient_bar}></div>
                <div className={styles.gradient_labels}>
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>

            <div className={styles.image_preview}>
              <div className={styles.preview_label}>Luminance Analysis</div>
              <div className={styles.preview_placeholder}>
                <div className={styles.placeholder_text}>
                  Brightness: {brightness} | Contrast: {contrast}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialized_Reflect;
