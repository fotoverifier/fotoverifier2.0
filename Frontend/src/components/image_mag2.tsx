'use client';
import { useState } from 'react';

export default function ImageMagnifier({
  src,
  width = '500px',
  height = '500px',
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoomLevel = 1.75,
}: {
  src: string;
  width?: string;
  height?: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Original Image */}
      <div
        style={{
          position: 'relative',
          height: height,
          width: width,
        }}
      >
        <img
          src={src}
          style={{ height: '100%', width: '100%' }}
          onMouseEnter={(e) => {
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();

            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            setShowMagnifier(false);
          }}
          alt="Original"
        />
      </div>

      {/* Zoomed-In Section */}
      <div
        style={{
          height: height,
          width: width,
          border: '1px solid lightgray',
          backgroundColor: 'white',
          backgroundImage: `url('${src}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,
          backgroundPositionX: `${-x * zoomLevel}px`,
          backgroundPositionY: `${-y * zoomLevel}px`,
        }}
      />
    </div>
  );
}
