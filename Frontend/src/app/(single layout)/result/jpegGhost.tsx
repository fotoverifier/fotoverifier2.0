import React from 'react';
import Image from 'next/image';
import Result from '@/assets/Group 79.svg';
import { SiJpeg } from 'react-icons/si';
import styles from '@/app/(single layout)/result/categories.module.css';
import round from 'lodash/round';
interface ImageResultProps {
  img: string | undefined; // Accept the image as a prop
  loading: boolean;
  commentary: number;
}

const JpegGhostResult: React.FC<ImageResultProps> = ({
  img,
  loading,
  commentary,
}) => {
  return (
    <div className="w-full h-full p-5">
      <div className={styles.title_container}>
        <div className="flex">
          <div className="circle_2">
            <SiJpeg />
          </div>
          <div className={styles.title}>JPEG Ghost</div>
        </div>
      </div>
      <div className={styles.image_container}>
        {loading ? (
          <div>Loading...</div>
        ) : img ? (
          <div
            className="flex items-center justify-center relative p-2 w-full"
            style={{ height: '90%' }}
          >
            <Image
              src={img}
              className="image-preview"
              alt={Result}
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
          <p>No image available</p> // Fallback message
        )}
      </div>
      <div className={styles.horizontal_line}> </div>
      <div> Commentary</div>
      <div>Potential modified area fraction: {round(commentary*100, 2)}%</div>
      {commentary < 0.1 ? (
        <div>Low probability of JPEG Ghosting</div>
      ) : commentary < 0.5 ? (
        <div>Medium probability of JPEG Ghosting</div>
      ) : (
        <div>High probability of JPEG Ghosting</div>
      )}
    </div>
  );
};

export default JpegGhostResult;
