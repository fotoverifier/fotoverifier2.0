import React from 'react';
import Image from 'next/image';
import { FaLayerGroup } from 'react-icons/fa';
import Result from '@/assets/Group 79.svg';
import styles from '@/app/(single layout)/result/categories.module.css';
import round from 'lodash/round';

interface ElaResultProp {
  img: string | undefined; // Accept the image as a prop
  loading: boolean;
  commentary: number;
}

const ElaResult: React.FC<ElaResultProp> = ({ img, commentary, loading }) => {
  return (
    <div className="w-full h-full flex flex-col p-5">
  {/* Title Section */}
  <div className={styles.title_container}>
    <div className="flex">
      <div className="circle_2">
        <FaLayerGroup />
      </div>
      <div className={styles.title}>Error Level Analysis</div>
    </div>
  </div>

  {/* Image Section */}
  <div className={`${styles.image_container} flex-1`}>
    {loading ? (
      <div>Loading...</div>
    ) : img ? (
      <div
        className="flex items-center justify-center relative p-2 w-full"
        style={{ height: "80%" }}
      >
        <Image
          src={img}
          className="image-preview"
          alt={Result}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "auto",
            maxWidth: "100%",
            height: "100%",
            objectFit: "contain",
            position: "relative",
          }}
        />
      </div>
    ) : (
      <p>No image available</p> // Fallback message
    )}
  </div>

  {/* Section to Always Stay at the Bottom */}
  <div className="border rounded-lg p-3 bg-gray-50 shadow-md mt-auto mb-2">
    {/* Potential Modified Area Fraction */}
    <div className="mb-2 text-base font-medium text-gray-800">
      Potential Modified Area Fraction:{" "}
      <span className="text-blue-600 font-bold">
        {round(commentary * 100, 2)}%
      </span>
    </div>

    {/* Error Level Analysis Probability */}
    {commentary < 0.1 ? (
      <div className="p-2 border-l-4 border-green-500 bg-green-100 rounded text-green-700 text-sm">
        Low probability of Error Level Analysis
      </div>
    ) : commentary < 0.5 ? (
      <div className="p-2 border-l-4 border-yellow-500 bg-yellow-100 rounded text-yellow-700 text-sm">
        Medium probability of Error Level Analysis
      </div>
    ) : (
      <div className="p-2 border-l-4 border-red-500 bg-red-100 rounded text-red-700 text-sm">
        High probability of Error Level Analysis
      </div>
    )}
  </div>
</div>
  );
};

export default ElaResult;
