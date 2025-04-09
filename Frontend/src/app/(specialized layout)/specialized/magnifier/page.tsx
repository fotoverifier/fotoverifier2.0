'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './magnifier.module.css';
import { BsZoomIn } from 'react-icons/bs';
import { IoMedicalSharp } from 'react-icons/io5';
import { Inter } from 'next/font/google';
import { style } from 'motion/react-client';
const inter = Inter({ subsets: ['latin'] });

const getLensSize = (sizeString: string): number => {
  switch (sizeString) {
    case 'Small':
      return 100;
    case 'Medium':
      return 150;
    case 'Large':
      return 200;
    default:
      return 150;
  }
};

const Magnifier = () => {
  const [zoomLevel, setZoomLevel] = useState(2);
  const [magnifierSize, setMagnifierSize] = useState('Medium');
  const [magnifierShape, setMagnifierShape] = useState('Circle');

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setImgDimensions] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleZoomLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(Number(e.target.value));
  };

  const handleMagnifierSizeChange = (size: string) => {
    setMagnifierSize(size);
  };

  const handleMagnifierShapeChange = (shape: string) => {
    setMagnifierShape(shape);
  };

  const handleReset = () => {
    setZoomLevel(2);
    setMagnifierSize('Medium');
    setMagnifierShape('Circle');
    setShowMagnifier(false);
    setXY([0, 0]);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { naturalWidth, naturalHeight } = imageRef.current;
    setImgDimensions([naturalWidth, naturalHeight]);
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.pageX - rect.left - window.scrollX;
    const currentY = e.pageY - rect.top - window.scrollY;

    const boundedX = Math.max(0, Math.min(currentX, rect.width));
    const boundedY = Math.max(0, Math.min(currentY, rect.height));

    setXY([boundedX, boundedY]);
  };

  const lensSizePixels = getLensSize(magnifierSize);
  const lensShapeClass =
    magnifierShape === 'Circle'
      ? styles.magnifier_lens_circle
      : styles.magnifier_lens_square;

  const imageUrl =
    'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE1fHxwbGFudCUyMGNsb3NlJTIwdXB8ZW58MHx8fHwxNjE5NzgxOTA0&ixlib=rb-1.2.1&q=80&w=800';

  // Calculate position for the magnifier so the cursor appears at the bottom left
  const magnifierLeft = x;
  const magnifierTop = y - lensSizePixels;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.helper_title}>
          <div className={`${inter.className} ${styles.title_badge}`}>
            <div className={styles.circle}>
              <IoMedicalSharp />
            </div>
            Magnifier
          </div>
        </div>
        <div onClick={handleReset} className={styles.reset_button}>
          Reset All
        </div>
      </div>
      <div className={styles.content_area}>
        <div className={styles.content_area_magnifier}>
          <div className={styles.section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <BsZoomIn />
              </div>
              <h2 className={`${styles.section_title} ${inter.className}`}>
                Magnification Settings
              </h2>
            </div>
            <div className={styles.section_content}>
              <div className={styles.control_group}>
                <label className={styles.control_label}>Zoom Level</label>
                <div className={styles.slider_container}>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={zoomLevel}
                    onChange={handleZoomLevelChange}
                    className={styles.slider}
                  />
                  <span className={styles.value_display}>
                    {zoomLevel.toFixed(1)}x
                  </span>
                </div>
              </div>
              <div className={styles.control_group}>
                <label className={styles.control_label}>Magnifier Size</label>
                <div className={styles.button_group}>
                  {['Small', 'Medium', 'Large'].map((size) => (
                    <div
                      key={size}
                      className={`${styles.option_button} ${magnifierSize === size ? styles.active : ''}`}
                      onClick={() => handleMagnifierSizeChange(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              {}
              <div className={styles.control_group}>
                <label className={styles.control_label}>Magnifier Shape</label>
                <div className={styles.button_group}>
                  {['Circle', 'Square'].map((shape) => (
                    <div
                      key={shape}
                      className={`${styles.option_button} ${magnifierShape === shape ? styles.active : ''}`}
                      onClick={() => handleMagnifierShapeChange(shape)}
                    >
                      {shape}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.debug_info}>
              Coords: ({x.toFixed(0)}, {y.toFixed(0)}) | Lens Size:{' '}
              {lensSizePixels}px | Img Size: {imgWidth}x{imgHeight}
            </div>
          </div>

          <div className={styles.image_display_section}>
            <div className={styles.section_header}>
              <div className={styles.circle_secondary}>
                <BsZoomIn />
              </div>
              <h2 className={`${styles.section_title} ${inter.className}`}>
                Preview Area
              </h2>
            </div>
            <div
              className={styles.image_container}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Source for magnifier"
                className={styles.source_image}
              />

              <div
                style={{
                  display: showMagnifier ? 'block' : 'none',
                  top: `${magnifierTop}px`,
                  left: `${magnifierLeft}px`,
                  width: `${lensSizePixels}px`,
                  height: `${lensSizePixels}px`,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                  backgroundPosition: `${-x * zoomLevel + lensSizePixels / 2}px ${-y * zoomLevel + lensSizePixels / 2}px`,
                }}
                className={`${styles.magnifier_lens} ${lensShapeClass}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Magnifier;
