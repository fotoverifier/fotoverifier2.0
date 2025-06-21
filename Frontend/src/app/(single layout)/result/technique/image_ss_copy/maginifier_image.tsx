/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from 'react';

interface MagnifierImageProps {
  src: string;
  zoom?: number;
  width?: number | string;
  height?: number | string;
}

const MagnifierImage: React.FC<MagnifierImageProps> = ({
  src,
  zoom = 2,
  width = '100%',
  height = '100%',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierStyle, setMagnifierStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const magnifierSize = 200; // or whatever you’re using

    setMagnifierStyle({
      display: 'block',
      top: `${y}px`, // center magnifier around cursor
      left: `${x}px`,
      width: `${magnifierSize}px`,
      height: `${magnifierSize}px`,
      backgroundImage: `url(${src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `-${x * zoom - magnifierSize / 2}px -${y * zoom - magnifierSize / 2}px`, // ← key fix
      backgroundSize: `${width * zoom}px ${height * zoom}px`,
      borderRadius: '50%',
      position: 'absolute',
      pointerEvents: 'none',
      border: '1px solid black',
      zIndex: 10,
    });
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width, height }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      className="overflow-hidden"
    >
      <img
        src={src}
        alt="Zoomable"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {showMagnifier && (
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            width: 200,
            height: 200,
            border: '2px solid #000',
            borderRadius: '50%',
            ...magnifierStyle,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default MagnifierImage;
