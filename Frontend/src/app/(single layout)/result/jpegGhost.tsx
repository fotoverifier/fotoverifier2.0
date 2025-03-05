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
import { MdOutlinePause, MdWarning } from 'react-icons/md';
import { FaCaretRight, FaPause } from 'react-icons/fa';
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
                className="p-1 rounded-full border-2 flex items-center justify-center bg-[#03564a] hover:bg-[#047c63] text-white border-white shadow-md"
                size={30}
              />
            ) : (
              <FaCaretRight
                className="p-1 rounded-full border-2 flex items-center justify-center bg-[#03564a] hover:bg-[#047c63] text-white border-white shadow-md"
                size={30}
              />
            )}
          </div>
        </div>
      </div>

      {jpegResult && (
        <>
          <Image
            src={jpegResult[4]}
            alt={'JPEG Ghost Image'}
            width={500}
            height={500}
          ></Image>
        </>
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
