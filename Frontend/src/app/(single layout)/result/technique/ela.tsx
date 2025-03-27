import React from 'react';
import Image from 'next/image';
import { FaLayerGroup } from 'react-icons/fa';
import Result from '@/assets/Group 79.svg';
import styles from '@/app/(single layout)/result/technique/categories.module.css';
import { MdWarning } from 'react-icons/md';

interface ElaResultProp {
  img: string | null; // Accept the image as a prop
  loading: boolean;
}

const ElaResult: React.FC<ElaResultProp> = ({ img, loading }) => {
  return (
    <div className="w-full h-full p-5 flex flex-col">
      <div className={styles.title_container}>
        <div className="flex justify-between">
          <div className="flex">
            <div className="circle_2">
              <FaLayerGroup />
            </div>
            <div className={styles.title}>Error Level Analysis</div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.image_container} flex-1 flex items-center justify-center`}
      >
        {loading ? (
          <></>
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
          <p>No image available</p>
        )}
      </div>

      <div className="mt-auto mb-2 flex items-center gap-2 p-3 border-l-4 border-red-500 bg-red-100 rounded-md shadow-sm">
        <MdWarning className="text-red-600" size={20} />
        <p className="text-red-700 text-sm font-medium">
          The tampered region is highlighted with a bright color.
        </p>
      </div>
    </div>
  );
};

export default ElaResult;
