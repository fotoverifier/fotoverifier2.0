import React, { useState } from 'react';
import Image from 'next/image';
import Result from '@/assets/Group 79.svg';
import { SiJpeg } from 'react-icons/si';
import styles from '@/app/(single layout)/result/categories.module.css';
import round from 'lodash/round';
import InfoButton from '@/components/button/info_button/info_button';
import placeholder from '@/assets/placeholder.png';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { MdWarning } from 'react-icons/md';
interface ImageResultProps {
  images: string[] | null;
  loading: boolean;
}

const JpegGhostResult: React.FC<ImageResultProps> = ({ images, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customSpinIcon = <LoadingOutlined style={{ fontSize: 48, color: "#00000" }} spin />;


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const qualities = [
    { title: 'Quality 30', img: images?.[0] ?? placeholder },
    { title: 'Quality 40', img: images?.[1] ?? placeholder },
    { title: 'Quality 50', img: images?.[2] ?? placeholder },
    { title: 'Quality 60', img: images?.[3] ?? placeholder },
    { title: 'Quality 70', img: images?.[4] ?? placeholder },
    { title: 'Quality 80', img: images?.[5] ?? placeholder },
  ];

  return (
    <div className="w-full h-full p-5 flex flex-col">
      <div className={styles.title_container}>
        <div className="flex justify-between">
          <div className="flex">
            <div className="circle_2">
              <SiJpeg />
            </div>
            <div className={styles.title}>JPEG Ghost</div>
          </div>
         
            <div onClick={openModal} className="focus:outline-none ml-auto ">
              <InfoButton></InfoButton>
            </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 h-screen">
           {loading ? (
            // Loading Spinner Section with Box
            <div className="relative p-6 bg-white rounded-lg shadow-md border border-gray-300 flex flex-col items-center gap-4">
              {/* Spinner */}
              <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#4caf50" }} spin />} />

              {/* Loading Message */}
              <p className="text-gray-700 text-lg font-medium">Loading... Please wait</p>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition duration-300"
              >
                ×
              </button>
            </div>
          )   : (
            // Modal Content Section
            <div className="bg-white rounded-lg w-[80%] h-[90%] p-6 flex flex-col">
              {/* Header Section */}
              <div className="flex items-center mb-6">
                <div className="text-xl font-bold border-2 border-green-800 rounded-lg p-2">
                  JPEG Ghost
                </div>
                <div className="ml-2">
                  <span className="text-red-500">* </span>The tampered region is highlighted with dark color.
                </div>
                <div
                  onClick={closeModal}
                  className="ml-auto bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                >
                  ×
                </div>
              </div>

              {/* Three-column Section */}
              <div className="flex flex-1 border-t pt-4">
                {/* Grid Section */}
                <div className="flex-[2] grid grid-cols-3 gap-4">
                  {qualities.map((quality, index) => (
                    <div key={index} className="p-4">
                      <h3 className="font-semibold mb-2">{quality.title}</h3>
                      {quality.img ? (
                        <div className="h-3/4 flex justify-center items-center">
                          <Image
                            src={quality.img}
                            alt={`Placeholder for ${quality.title}`}
                            width={150}
                            height={150}
                            className="mb-2"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="h-3/4 flex justify-center items-center">
                          No image available
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.image_container}>
        {loading ? (
          <></>
        ) : images ? (
          <div
            className="flex items-center justify-center relative p-2 w-full"
            style={{ height: '90%' }}
          >
            <Image
              src={typeof images?.[4] === 'string' ? images[4] : placeholder}
              alt="JPEG Ghost Result"
              width={150}
              height={150}
              sizes="100vw"
              unoptimized
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
          <></>
        )}
      </div>

      <div className="mt-auto mb-2 flex items-center gap-2 p-3 border-l-4 border-red-500 bg-red-100 rounded-md shadow-sm">
              <MdWarning className="text-red-600" size={20} />
              <p className="text-red-700 text-sm font-medium">
                The tampered region is highlighted with a dark color.
              </p>
            </div>
    </div>
  );
};

export default JpegGhostResult;
