'use client';
import React, { useEffect, useState, Suspense } from 'react';
import '@/app/(single layout)/result/result.css';
import Image from 'next/image';
import Image_Result from './image';
import MetaData_Result from './metadata';
import pattern from '@/assets/Frame 15.svg';
import { Inter } from 'next/font/google';
import { useSearchParams } from 'next/navigation';
import JpegGhostResult from './jpegGhost';
import ImgTagging_Result from './osm_tags';
import { ExifData, SearchResult, Tagging } from '@/interface/interface';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const inter = Inter({ subsets: ['latin'] });
const Result = () => {
  const searchParams = useSearchParams();
  const img = searchParams.get('image');
  const wsUrls = searchParams.get('wsUrls');

  const [exifResult, setExifResult] = useState<ExifData | null>(null);
  const [SearchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [jpegResult, setJpegResult] = useState<string | null>(null);
  const [commentary, setCommentary] = useState<number>(0);
  const [tagResult, setTagResult] = useState<string | null>(null);
  const [loadingJpegGhost, setLoadingJpegGhost] = useState<boolean>(true);
  const [loadingExifCheck, setLoadingExifCheck] = useState<boolean>(true);
  const [loadingReverseImageSearch, setLoadingReverseImageSearch] =
    useState<boolean>(true);
  const [loadingTagResult, setLoadingTagResult] = useState<boolean>(true);

  useEffect(() => {
    if (wsUrls) {
      try {
        const parsedUrls = JSON.parse(wsUrls);
        const wsUrlObj = parsedUrls;

        const ws = new WebSocket(wsUrlObj.websocket_url);

        ws.onopen = () => {
          console.log('Websocket connected at ', wsUrlObj.websocket_url);
        };
        ws.onclose = () => {
          console.log('Websocket closed at ', wsUrlObj.websocket_url);
        };
        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log('Message:', message);
            if (message.result === 'completed') {
              ws.close();
            } else if (message.task === 'exif_check') {
              setExifResult(message.result);
              setLoadingExifCheck(false);
            } else if (message.task === 'reverse_image_search') {
              setSearchResult(message.result.image_results);
              setLoadingReverseImageSearch(false);
            } else if (message.task === 'jpeg_ghost') {
              setJpegResult(message.result[0]);
              setCommentary(message.result[1]);
              setLoadingJpegGhost(false);
            } else if (message.task === 'recognize_image') {
              setTagResult(message.result);
              setLoadingTagResult(false);
            }
          } catch (error) {
            console.error('Failed to parse wsUrls:', error);
          }
        };
        ws.onerror = (error) => {
          console.error(`WebSocket error at ${wsUrlObj.websocket_url}:`, error);
        };
        return () => {
          ws.close();
        };
      } catch (error) {
        console.error('Failed to parse wsUrls:', error);
      }
    }
  }, [wsUrls]);

  return (
    <>
      <div className={`Top-container ${inter.className}`}>
        <div
          className={`Confident-score-container ${inter.className} font-bold`}
        >
          {' '}
          The confident score:{' '}
        </div>
        <div className="vertical-space"></div>
        <div className="General-report-container">
          <Image src={pattern} width={200} height={200} alt={''}></Image>
          <div className="font-bold text-4xl">GENERAL REPORT </div>
          <Image src={pattern} width={200} height={200} alt={''}></Image>
        </div>
      </div>
      <div className={`Content-container ${inter.className}`}>
        <div className="Half-content-container">
          <div className="Result-container">
            <Image_Result img={img} />
          </div>
          <div className="Result-container">
            <JpegGhostResult
              img={`data:image/jpeg;base64,${jpegResult}`}
              commentary={commentary}
              loading={loadingJpegGhost}
            />
          </div>
          <div className="Result-container">
            <ImgTagging_Result Tag={tagResult} loading={loadingTagResult} />
          </div>
        </div>
        <div className="Half-content-container">
          <div className="Result-container">
            <MetaData_Result
              cameraInformation={exifResult?.camera_information || undefined}
              original_date={exifResult?.original_date || undefined}
              modify_date={exifResult?.modify_date || undefined}
              software_modify={exifResult?.software_modify || undefined}
              author_copyright={exifResult?.author_copyright || undefined}
              gps_location={exifResult?.gps_location}
              loading={loadingExifCheck}
              // Pass camera information as prop
            />
          </div>
          <div className="Result-container">
            <div className="w-full h-full p-5">
              <div className="flex">
                <div className="circle_2"> 6. </div>
                <div className="font-bold text-lg ml-2 mb-5">
                  Reversed Image Search
                </div>
              </div>
              {loadingReverseImageSearch ? (
                <Flex align="center" gap="middle">
                  <Spin indicator={<LoadingOutlined spin />} />
                </Flex>
              ) : (
                <div>
                  {SearchResult?.map((result, index) => (
                    <div key={index}>
                      <a
                        href={result.redirect_link}
                        className="hover: underline"
                      >
                        {index + 1}. {result.title}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center"></div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined spin />} />
        </Flex>
      }
    >
      <Result />
    </Suspense>
  );
}
