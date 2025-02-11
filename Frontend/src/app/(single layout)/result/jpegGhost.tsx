import React, { useState } from 'react';
import Image from 'next/image';
import Result from '@/assets/Group 79.svg';
import { SiJpeg } from 'react-icons/si';
import styles from '@/app/(single layout)/result/categories.module.css';
import round from 'lodash/round';
import InfoButton from '@/components/button/info_button/info_button';
import placeholder  from "@/assets/placeholder.png";
interface ImageResultProps {
  img: string | undefined; // Accept the image as a prop
  loading: boolean;
  commentary: number;
}


const qualities = [
  {
    title: "Quality 1",
    img: placeholder, // Replace with the actual image path
    caption: "Content for Quality 1",
  },
  {
    title: "Quality 2",
    img: placeholder, // Replace with the actual image path
    caption: "Content for Quality 2",
  },
  {
    title: "Quality 3",
    img: placeholder, // Replace with the actual image path
    caption: "Content for Quality 3",
  },
  {
    title: "Quality 4",
    img: placeholder, // Replace with the actual image path
    caption: "Content for Quality 4",
  },
  {
    title: "Quality 5",
    img: placeholder, // Replace with the actual image path
    caption: "Content for Quality 5",
  },
  {
    title: "Quality 6",
    img: placeholder, // Replace with the actual image path
    caption: "Content for Quality 6",
  },
];


const JpegGhostResult: React.FC<ImageResultProps> = ({
  img,
  loading,
  commentary,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full h-full p-5">
      <div className={styles.title_container}>
        <div className="flex">
          <div className="circle_2">
            <SiJpeg />
          </div>
          <div className={styles.title}>JPEG Ghost</div>
           <div onClick={openModal} className="focus:outline-none ml-auto ">
            <InfoButton></InfoButton>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 h-screen">
          <div className="bg-white rounded-lg w-[80%] h-[90%] p-6 flex flex-col">
            {/* Header Section */}
            <div className='flex items-center mb-6'> 
              <div className="text-xl font-bold border-2 border-green-800 rounded-lg p-2"> JPEG Ghost </div> 
              <div className="ml-2"> [Library] </div>
              <div className='ml-2'> The best way to detect abnormalities is to inspect regions with higher reflection </div>
              <div
              onClick={closeModal}
              className="ml-auto bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer "
            >
              ×
            </div>
            </div>

            {/* Three-column Section */}
              <div className="flex flex-1 border-t pt-4">
            {/* First Section */}
            <div className="flex-1 p-4 border-r border-gray-200">
              <div className="flex mb-2 items-center">
                <h3 className="font-semibold">Section 1</h3>
                <div className="ml-2">[Implementation]</div>
              </div>
              <div className='h-3/4 flex justify-center items-center'> 
              <Image
                src= {placeholder}
                alt="Placeholder for Section 1"
                width={150}
                height={150}
                className="mb-2"
              />
              </div>
              Content for first section
            </div>
            {/* Grid Section */}
             <div className="flex-[2] grid grid-cols-3 gap-4">
              {qualities.map((quality, index) => (
                <div key={index} className="p-4">
                  <h3 className="font-semibold mb-2">{quality.title}</h3>
                  <div className="h-3/4 flex justify-center items-center">
                    <Image
                      src={quality.img}
                      alt={`Placeholder for ${quality.title}`}
                      width={150}
                      height={150}
                      className="mb-2"
                    />
                  </div>
                  <p>{quality.caption}</p>
                </div>
              ))}
            </div>
              </div>
                </div>
              </div>
      )}
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
