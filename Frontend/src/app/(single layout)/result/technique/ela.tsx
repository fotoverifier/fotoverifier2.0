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
        <div className="flex items-center mb-3">
          <div className="flex items-center justify-center bg-slate-200 text-teal-800 rounded-full w-10 h-10 shadow-sm">
            <FaLayerGroup size={18} />
          </div>
          <h3 className="font-bold text-lg ml-3 text-teal-800">
            Error Level Analysis
          </h3>
        </div>
      </div>
      <div
        className={`${styles.image_container} flex-1 flex items-center justify-center`}
      >
        {loading ? (
          <div className={styles.image_container}>
            <div className={styles.loadingBox}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>Please wait</p>
            </div>
          </div>
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
