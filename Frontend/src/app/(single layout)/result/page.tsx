'use client';
import React, { useEffect, useState } from 'react';
import '@/app/(single layout)/result/result.css';
import Image from 'next/image';
import Image_Result from './image';
import MetaData_Result from './metadata';
import pattern from '@/assets/Frame 15.svg';
import { Inter } from 'next/font/google';
import { useSearchParams } from 'next/navigation';
import JPEG_Result from './object_detection';
import ImgTagging_Result from './osm_tags';

type WebSocketUrl = {
  websocket_url: string;
};
interface ExifData {
  exif_data: any;
  software_modify: string | undefined;
  modify_date: string | undefined;
  original_date: {
    original_date: string | undefined;
    create_date: string | undefined;
  };
  camera_information: {
    make: string | undefined;
    model: string | undefined;
    exposure: string | undefined;
    aperture: string | undefined;
    focal_length: string | undefined;
    iso_speed: string | undefined;
    flash: string | undefined;
  };
  gps_location: string | undefined;
  author_copyright: {
    author: string | undefined;
    copyright_tag: string | undefined;
    profile_copyright: string | undefined;
  };
}

interface SearchResult {
  title: string | undefined;
  redirect_link: string | undefined;
}

interface Result {
  exif_data: any;
  jpeg_ghost_result: string;
  reverse_image_search_results: any;
}
interface Tagging{
  tag: string;
}
const inter = Inter({ subsets: ['latin'] });
const Result = () => {
  const searchParams = useSearchParams();
  const img = searchParams.get('image');
  const wsUrls = searchParams.get('wsUrls');

  const [exifResult, setExifResult] = useState<ExifData | null>(null);
  const [SearchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [jpegResult, setJpegResult] = useState<string | null>(null);
  const [tagResult, settagResult] = useState<string | null>(null);

  useEffect(() => {
    const websockets: any[] = [];
    if (wsUrls) {
      try {
        const parsedUrls = JSON.parse(wsUrls);
        parsedUrls.forEach((wsUrlObj: WebSocketUrl) => {
          const ws = new WebSocket(wsUrlObj.websocket_url);
          websockets.push(ws);

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
              if (message.task === 'exif_check') {
                setExifResult(message.result);
              }
              if (message.task === 'reverse_image_search') {
                setSearchResult(message.result.image_results);
              }
              if (message.task === 'jpeg_ghost') {
                setJpegResult(message.result);
              }
              else{
                if (message.task === 'recognize_image'){
                  settagResult(message.result);
                }
              }
            } catch (error) {
              console.error('Failed to parse wsUrls:', error);
            }
          };
          ws.onerror = (error) => {
            console.error(
              `WebSocket error at ${wsUrlObj.websocket_url}:`,
              error
            );
          };
        });
      } catch (error) {
        console.error('Failed to parse wsUrls:', error);
      }
    }
  }, [wsUrls]);

  // useEffect(() => {
  //   if (data) {
  //     // Decode the data here
  //     const decodedData = JSON.parse(
  //       Buffer.from(data, "base64").toString("utf-8")
  //     );
  //     setTaskData(decodedData);
  //     console.log("Decoded Data:", decodedData);
  //     setIsFetching(true);
  //     console.log("Fetching true");
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (taskData && taskData.task_id && isFetching) {
  //     const fetchTaskStatus = async () => {
  //       console.log("start");
  //       try {
  //         const response = await fetch(
  //           `http://127.0.0.1:8000/api/task-status/${taskData?.task_id}/`,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //           }
  //         );
  //         console.log("Response:", response);
  //         if (!response.ok) {
  //           throw new Error(`Error: ${response.statusText}`);
  //         }

  //         const fetchedData = await response.json();

  //         if (fetchedData.status === "SUCCESS") {
  //           setmethodData(fetchedData.result); // Store the response data in the state
  //           setIsFetching(false);
  //           console.log("Fetching false");
  //           window.clearInterval(intervalIdRef.current!);
  //           intervalIdRef.current = null;
  //         }
  //       } catch (error) {
  //         console.error("Failed to fetch task status:", error);
  //       }
  //     };

  //     intervalIdRef.current = setInterval(fetchTaskStatus, 5000);

  //     return () => {
  //       if (intervalIdRef.current) {
  //         setIsFetching(false);
  //         console.log("Fetching false");
  //         window.clearInterval(intervalIdRef.current);
  //         intervalIdRef.current = null;
  //       }
  //     };
  //   }
  // }, [taskData, isFetching]);

  // useEffect(() => {
  //   if (methodData) {
  //     console.log("Updated methodData:", methodData);
  //   }
  // }, [methodData]);

  // useEffect(() => {
  //   if (img) {
  //     // Set the retrieved image as base64
  //     setRetrieveImg(img);
  //   }
  // }, [img]);

  // useEffect(() => {
  //   if (methodData) {
  //     console.log(methodData.exif_data);
  //     setExifData(methodData.exif_data);
  //     setSearchData(methodData.reverse_image_search_results.image_results);
  //   }
  // }, [methodData]);
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
            <JPEG_Result img={`data:image/jpeg;base64,${jpegResult}`} />
          </div>
          <div className="Result-container">
            <ImgTagging_Result Tag={tagResult} />
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
              // Pass camera information as prop
            />
          </div>
          <div className="Result-container">
            {' '}
            <div className="w-full h-full p-5">
              <div className="flex">
                <div className="circle_2"> 6. </div>
                <div className="font-bold text-lg ml-2 mb-5">
                  Reversed Image Search
                </div>
              </div>
              {SearchResult?.map((result, index) => (
                <div key={index}>
                  <a href={result.redirect_link} className="hover: underline">
                    {index + 1}. {result.title}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center"></div>
    </>
  );
};

export default Result;
