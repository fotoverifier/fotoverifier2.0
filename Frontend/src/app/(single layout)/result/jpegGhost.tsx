import React, { useState } from 'react';
import Image from 'next/image';
import { SiJpeg } from 'react-icons/si';
import styles from '@/app/(single layout)/result/categories.module.css';
import placeholder from '@/assets/placeholder.png';
import { LoadingOutlined } from '@ant-design/icons';
import { MdOutlinePause, MdWarning } from 'react-icons/md';
import { FaCaretRight, FaInfoCircle, FaPause } from 'react-icons/fa';
interface ImageResultProps {
  wsUrls: string | null;
}

const JpegGhostResult: React.FC<ImageResultProps> = ({ wsUrls }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customSpinIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: '#00000' }} spin />
  );

  const openModal = () => setIsModalOpen(true);
  const [isRunning, setIsRunning] = useState(false);
  const [jpegResult, setJpegResult] = useState<string[] | null>(null);
  const [loadingJpegGhost, setLoadingJpegGhost] = useState<boolean>(false);

  const [runCompleted, setRunCompleted] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const qualities = [
    { title: 'Quality 30', img: jpegResult?.[0] ?? placeholder },
    { title: 'Quality 40', img: jpegResult?.[1] ?? placeholder },
    { title: 'Quality 50', img: jpegResult?.[2] ?? placeholder },
    { title: 'Quality 60', img: jpegResult?.[3] ?? placeholder },
    { title: 'Quality 70', img: jpegResult?.[4] ?? placeholder },
    { title: 'Quality 80', img: jpegResult?.[5] ?? placeholder },
  ];

  const runJpegGhost = () => {
    if (!wsUrls) {
      console.error('WebSocket URL is missing.');
      return;
    }

    try {
      const parsedUrls = JSON.parse(wsUrls);
      const wsUrlObj = parsedUrls;

      const websocket = new WebSocket(wsUrlObj.websocket_url);
      setLoadingJpegGhost(true);

      websocket.onopen = () => {
        console.log('WebSocket connected for JPEG Ghost task.');
      };

      websocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log('Received message:', message);

          if (message.task === 'jpeg_ghost') {
            setJpegResult(message.result);
            setLoadingJpegGhost(false);
            setIsRunning(false); // Stop animation when task completes
            setRunCompleted(true); // Mark run as completed
            websocket.close(); // Close WebSocket after receiving jpeg_ghost result
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      websocket.onclose = () => {
        console.log('WebSocket closed.');
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to parse wsUrls:', error);
    }
  };
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
              if (!isRunning) {
                runJpegGhost(); // Run jpeg ghost when starting
              }
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

          {runCompleted && (
            <button
              onClick={openModal}
              className="p-1 rounded-full border-2 flex items-center justify-center bg-[#03564a] hover:bg-[#047c63] text-white border-white shadow-md ml-3"
            >
              <FaInfoCircle size={20} />
            </button>
          )}
        </div>
      </div>

      {isRunning ? (
        <div className={styles.image_container}>
          <div className={styles.loadingBox}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>Loading... Please wait</p>
          </div>
        </div>
      ) : (
        jpegResult && (
          <div className={styles.image_container}>
            <Image
              src={jpegResult[4]}
              alt={'JPEG Ghost Image'}
              width={500}
              height={500}
              className={styles.image_preview}
            />
          </div>
        )
      )}

      {isModalOpen && (
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
                onClick={closeModal}
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
