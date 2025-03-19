import React, { useState } from 'react';
import Image from 'next/image';
import { SiJpeg } from 'react-icons/si';
import styles from '@/app/(single layout)/result/categories.module.css';
import placeholder from '@/assets/placeholder.png';
import { LoadingOutlined } from '@ant-design/icons';
import { MdOutlinePause, MdWarning } from 'react-icons/md';
import { FaCaretRight, FaInfoCircle, FaPause } from 'react-icons/fa';
interface ImageResultProps {
  images: string[] | null; 
  loading: boolean;
}

const JpegGhostResult: React.FC<ImageResultProps> = ({ images, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const qualities = [
    { title: 'Quality 30', img: images?.[0] ?? placeholder },
    { title: 'Quality 40', img: images?.[1] ?? placeholder },
    { title: 'Quality 50', img: images?.[2] ?? placeholder },
    { title: 'Quality 60', img: images?.[3] ?? placeholder },
    { title: 'Quality 70', img: images?.[4] ?? placeholder },
    { title: 'Quality 80', img: images?.[5] ?? placeholder },
  ];

 
  const handleDetailClick = () => {
    // Implement your detail action here
    console.log('Detail button clicked');
  };

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
          <div
            id="jpeg-specific"
            className="focus:outline-none ml-auto"
            onClick={() => {
              setIsRunning(!isRunning);
            }}
          >
            {isRunning ? (
              <MdOutlinePause
                className="p-1 rounded-full border-2 flex items-center justify-center bg-[#03564a] hover:bg-[#047c63] text-white shadow-md"
                size={30}
              />
            ) : (
              <FaCaretRight
                className="p-1 rounded-full border-2 flex items-center justify-center bg-[#03564a] hover:bg-[#047c63] text-white shadow-md"
                size={30}
              />
            )}
          </div>

          {!loading && images && images.length > 0 &&  (
            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1 rounded-full border-2 flex items-center justify-center bg-[#03564a] hover:bg-[#047c63] text-white border-white shadow-md ml-3"
            >
              <FaInfoCircle size={20} />
            </button>
          )}
        </div>
      </div>

      {loading && isRunning ? (
        <div className={styles.image_container}>
          <div className={styles.loadingBox}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading... Please wait</p>
          </div>
        </div>
      ) : (
        images && images.length > 0 && (
          <div className={styles.image_container}>
            <Image
              src={images[4]}
              alt={'JPEG Ghost Image'}
              width={500}
              height={500}
              className={styles.image_preview}
            />
          </div>
        )
      )}

      {isModalOpen && images && images.length > 0 &&  (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 h-screen">
          <div
            id="jpeg-modal"
            className="bg-white rounded-lg w-[80%] h-[90%] p-6 flex flex-col"
          >
            <div className="flex items-center mb-6">
              <div className="text-xl font-bold border-2 border-green-800 rounded-lg p-2">
                JPEG Ghost
              </div>
              <div className="ml-2">
                <span className="text-red-500">* </span>The tampered region is
                highlighted with dark color.
              </div>
              <div
                onClick={() => setIsModalOpen(false)}
                className="ml-auto bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              >
                ×
              </div>
            </div>

            <div className="flex flex-1 border-t pt-4">
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
        </div>
      )}

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
