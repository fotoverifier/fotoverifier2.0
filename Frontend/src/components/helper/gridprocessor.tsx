import React, { useEffect, useRef, useState } from 'react';

interface GridImageProcessorProps {
  src: string;
  onProcessed?: (result: string) => void; // optional callback
  lineColor?: string;
  lineWidth?: number;
  style?: React.CSSProperties;
}

const GridImageProcessor: React.FC<GridImageProcessorProps> = ({
  src,
  onProcessed,
  lineColor = 'rgba(255, 0, 0, 0,8)',
  lineWidth = 5,
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      // Vertical lines
      for (let i = 1; i < 3; i++) {
        const x = (canvas.width / 3) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      // Horizontal lines
      for (let i = 1; i < 3; i++) {
        const y = (canvas.height / 3) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      const dataURL = canvas.toDataURL('image/png');
      setProcessedSrc(dataURL);
      onProcessed?.(dataURL);
    };
  }, [src, lineColor, lineWidth, onProcessed]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {processedSrc && (
        <img
          src={processedSrc}
          alt="Processed with Grid"
          style={style}
        />
      )}
    </>
  );
};

export default GridImageProcessor;
