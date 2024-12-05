"use client"
import React, { useEffect, useState } from 'react'
import { Inter, Montserrat } from 'next/font/google';
import styles from "@/app/(single layout)/result2/res.module.css"
import { IoLibrary } from 'react-icons/io5';
import Tabs from '@/components/step_tab';
import Image from 'next/image';
import pattern from '@/assets/Frame 15.svg';
import { ExifData, SearchResult } from '@/interface/interface';
import { useSearchParams } from 'next/navigation';
import Image_Result from '../result/image';
import JPEG_Result from '../result/object_detection';
import ImgTagging_Result from '../result/osm_tags';
import MetaData_Result from '../result/metadata';

const inter = Inter({subsets: ["latin"]});
const montserrat = Montserrat({subsets: ["latin"]});

type WebSocketUrl = {
  websocket_url: string;
};
const Res2 = () => {

    {/* SERVER AREA */}

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
              if (message.result === 'completed') {
                ws.close();
              }
              else if (message.task === 'exif_check') {
                setExifResult(message.result);
              }
              else if (message.task === 'reverse_image_search') {
                setSearchResult(message.result.image_results);
              }
              else if (message.task === 'jpeg_ghost') {
                setJpegResult(message.result);
              }
              else if (message.task === 'recognize_image'){
                  settagResult(message.result);
                }
              }
              catch (error) {
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




     {/* TAB AREA */}
    const tabs = ["Overview","Originality", "Who", "Where", "When", "Why"];

     const renderContent = (activeTab: string) => {
        const content = {
             Overview:
               <div className='h-full w-full'>
                <div className={styles.Half_content_container}>
                <div className={styles.Result_container}>
                    <Image_Result img={img} />
                </div>
                <div className={styles.Result_container}>
                    <JPEG_Result img={`data:image/jpeg;base64,${jpegResult}`} />
                </div>
                <div className={styles.Result_container}>
                    <JPEG_Result img={`data:image/jpeg;base64,${jpegResult}`} />
                </div>
                </div>
                  <div className={styles.Half_content_container}>
                    <div className={styles.Result_container}>
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

                      <div className={styles.Result_container}>
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

                      <div className={styles.Result_container}>
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
                    </div>
                    </div>
                , 
                Originality:<div className='h-full w-full'>
                  Or
                </div>
                , 
                Who: "Details about who.",
                Where: "Information on where.",
                When: "Timing details.",
                Why: "Explanation of why."
        };
        return <div className='h-full w-full'>{
            
            content[activeTab as keyof typeof content] || "No content available."}</div>;
    };


  return (

    <div className={styles.libraries_container}>
        <div className={styles.res_header_container}> 
      <div className='flex items-center h-fit w-fit p-2 rounded-full border-2 border-green-800'>
        <div className={styles.circle}> <IoLibrary/> </div>
        <div className={`ml-2 font-bold text-xl ${inter.className}`}> The confident score </div>
      </div>
        <Image src={pattern} width={250} height={200} alt={''}></Image>
          <div className={`font-bold text-4xl ${montserrat.className}`}>GENERAL REPORT </div>
        <Image src={pattern} width={250} height={200} alt={''}></Image>
      </div>
      <div className='w-full h-full'>
        <Tabs tabs={tabs} renderContent={renderContent}  />
        </div>
      </div>
  );
};

export default Res2