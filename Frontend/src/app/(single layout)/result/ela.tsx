import React from 'react';
import Image from 'next/image';
import { FaLayerGroup } from 'react-icons/fa';
import styles from "@/app/(single layout)/result/categories.module.css"

interface ElaResultProp {
  img: string | undefined; // Accept the image as a prop
  loading: boolean;
}

const ElaResult: React.FC<ElaResultProp> = ({ img, loading }) => {
  return (
     <div className="w-full h-full p-5">
      <div className={styles.title_container}>
      <div className="flex">
        <div className="circle_2"> <FaLayerGroup /></div>
        <div className={styles.title}>Error Level Analysis</div>
      </div>
      </div>
      <div className={styles.image_container}>
      {loading ? (
        <div>Loading...</div>
      ) : img ? (
        <img src={img} alt= " " className="h-5/6 w-5/6" /> // Display the image if it exists
      ) : (
        <p>No image available</p> // Fallback message
      )}
      </div>
      <div className={styles.horizontal_line}> </div>
      <div> Commentary</div>
    </div>
  );
};

export default ElaResult;
