'use client';
import React, { useEffect, useState, Suspense, useRef, act } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import styles from '@/app/(single layout)/result/res.module.css';
import Tabs from '@/components/tab/step_tab';
import Image from 'next/image';
import { ExifData, SearchResult } from '@/interface/interface';
import { useSearchParams } from 'next/navigation';
import Image_Result from './image';
import ImgTagging_Result from './osm_tags';
import MetaData_Result from './metadata';
import JpegGhostResult from './jpegGhost';
import ElaResult from './ela';
import ReverseImgResult from './reverse_img';

import {
  FaCamera,
  FaUser,
} from 'react-icons/fa';
import { PiAppWindowFill } from 'react-icons/pi';
import { BiSolidCategory } from 'react-icons/bi';
import MapComponent from '@/components/map/map';

import { FiMapPin } from 'react-icons/fi';
const inter = Inter({ subsets: ['latin'] });
import unknown_author from '@/assets/unknown_author.jpg';
import HeaderReport from '@/components/head/head_result';

const Res = () => {
  const location: [number, number] = [51.505, -0.09];
  {
    /* SERVER AREA */
  }

  const searchParams = useSearchParams();
  const img = searchParams.get('image');
  const taskId = searchParams.get('task_id');

  const [results, setResults] = useState<any[]>([]); // Store received responses

  const [exifResult, setExifResult] = useState<ExifData | null>(null);
  const [SearchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [tagResult, setTagResult] = useState<string | null>(null);
  const [elaResult, setElaResult] = useState<string | null>(null);
  const [jpegGhostResult, setJpegGhostResult] = useState<string[] | null>(null);

  const [loadingExifCheck, setLoadingExifCheck] = useState<boolean>(true);
  const [loadingReverseImageSearch, setLoadingReverseImageSearch] =
    useState<boolean>(true);
  const [loadingTagResult, setLoadingTagResult] = useState<boolean>(true);
  const [loadingEla, setLoadingEla] = useState<boolean>(true);
  const [loadingJpegGhost, setLoadingJpegGhost] = useState<boolean>(true);




  useEffect(() => {
    if(!img || !taskId) return;

    const eventSource = new EventSource(
      `http://localhost:8000/quick-scan-stream/?task_id=${taskId}`
    );



    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Received:", data);

        if (data.status === "done") {
          console.log("All tasks completed. Closing SSE...");
          eventSource.close();
          return;
        }

        if (!data?.result?.result?.method) {
          console.warn("Unexpected SSE data format:", data);
          return; // Skip this iteration if 'method' is missing
        }

        switch (data.result.result.method) {
          case "exif":
            setExifResult(data.result.result.exif_data);
            setLoadingExifCheck(false);
            break;
          case "jpeg_ghost":
            setJpegGhostResult(data.result.result.jpeg_ghost);
            setLoadingJpegGhost(false);
            break;
          case "ram":
            setTagResult(data.result.result.recognized_objects);
            setLoadingTagResult(false);
            break;
          case "reverse_search":
            setSearchResult(data.result.result.reverse_search.image_results);
            setLoadingReverseImageSearch(false);
            break;
          case "ela":
            setElaResult(data.result.result.ela_image);
            setLoadingEla(false);
            break;
          default:
            console.warn("Unknown task received:", data.task);
        }

        setResults((prevResults) => [...prevResults, data]);
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    }

    eventSource.onerror = (error) => {
      console.log(eventSource.readyState);
      if(eventSource.readyState === EventSource.CLOSED || eventSource.readyState == 0) return; // Skip if connection is closed
      else console.error("SSE connection error:", error);
      eventSource.close();
    };


    return () => {
      eventSource.close(); // Clean up on unmount
    };

  }, []);

  const [activeTab, setActiveTab] = useState('Tampering_Detection');

  const renderContent = (activeTab: string) => {
    const tabData = {
      Tampering: (
        <div className={`h-full w-full ${styles.striped_background}`}>
          <div className={styles.Seven_content_container}>
            <div id="img" className={styles.Result_container}>
              <Image_Result img={img} />
            </div>
            <div id="jpeg_ghost" className={styles.Result_container}>
              <JpegGhostResult images={jpegGhostResult} loading={loadingJpegGhost}/>
            </div>
            <div id="ela" className={styles.Result_container}>
              <ElaResult
                img={elaResult}
                loading={loadingEla}
              />
            </div>
          </div>
        </div>
      ),
      OtherTabs: [
        {
          key: 'Originality',
          title: 'Originality',
          description:
            'Related to information of the camera or who takes the picture',
          content: (
            <div className="h-full w-full flex">
              <div className="w-1/3 h-full">
                <div
                  id="MetaDataArea"
                  className="h-1/6 w-full bg-white rounded-full"
                >
                  <MetaData_Result
                    cameraInformation={
                      exifResult?.camera_information || undefined
                    }
                    original_date={exifResult?.original_date || undefined}
                    modify_date={exifResult?.modify_date || undefined}
                    software_modify={exifResult?.software_modify || undefined}
                    author_copyright={exifResult?.author_copyright || undefined}
                    gps_location={exifResult?.gps_location}
                    loading={loadingExifCheck}
                  />
                </div>
                <div
                  id="CameraArea"
                  className="h-5/6 w-full bg-white rounded-md"
                >
                  <div className="flex p-5 h-1/6">
                    <div className={styles.circle_2}>
                      <FaCamera />
                    </div>
                    <div className="font-bold text-lg ml-2 border-black">
                      {' '}
                      Camera information
                    </div>
                  </div>

                  <div className="h-5/6 border-2 rounded-xl w-full flex items-center justify-center">
                    <Image
                      src={
                        exifResult?.camera_information?.camera_image
                          ?.image_results?.[0].original || unknown_author
                      }
                      alt="Camera Image"
                      width={210}
                      height={210}
                    />
                  </div>
                </div>
              </div>

              <div className="h-full w-[0.5px] bg-slate-300 mx-5"></div>
              <div className="w-1/3 h-full">
                <div
                  id="AuthorArea"
                  className="h-5/6 w-full  bg-white rounded-md"
                >
                  <div className="flex p-5 h-1/6">
                    <div className={styles.circle_2}>
                      <FaUser />
                    </div>
                    <div className="font-bold text-lg ml-2 border-black">
                      {' '}
                      Author Information
                    </div>
                  </div>
                  <div className="h-5/6 border-2 rounded-xl w-full flex items-center justify-center">
                    <Image
                      src={
                        exifResult?.author_copyright?.author_image
                          ?.image_results?.[0].original || unknown_author
                      }
                      alt="Camera Image"
                      width={200}
                      height={200}
                      objectFit="contain"
                    />
                  </div>
                </div>
                <div className="h-1/6 w-full py-2">
                  <div className="flex p-5 border-2 rounded-xl">
                    <div className={styles.circle_2}>
                      <PiAppWindowFill />
                    </div>
                    <div className="font-bold text-lg ml-2 border-black">
                      {' '}
                      Software Modification
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-full w-[0.5px] bg-slate-300 mx-5"></div>

              <div className="w-1/3 h-full">
                <div
                  id="ReverseArea"
                  className="h-1/2 bg-white w-full rounded-md"
                >
                  <ReverseImgResult
                    searchResult={SearchResult}
                    loading={loadingReverseImageSearch}
                  />
                </div>
                <div
                  id="ImageTaggingArea"
                  className="h-1/2 bg-white w-full rounded-md"
                >
                  <ImgTagging_Result
                    Tag={tagResult}
                    loading={loadingTagResult}
                  />
                </div>
              </div>
            </div>
          ),
        },
        {
          key: 'Location',
          title: 'Location',
          description: 'Maps and GPS coordinates of the photos location.',
          content: (
            <div className={`h-full w-full flex`}>
              <div className="h-[90%] w-2/3">
                <MapComponent
                  coordinate={[
                    Number(exifResult?.gps_location?.latitude),
                    Number(exifResult?.gps_location?.longitude),
                  ]}
                />
              </div>
              <div className="h-full w-[0.5px] bg-slate-300 mx-5"></div>
              <div className="h-full w-1/3 p-4 border rounded-lg shadow-md bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                  <div className="mr-2 flex items-center justify-center bg-green-200 text-green-900 rounded-full w-8 h-8">
                    <FiMapPin size={16} />
                  </div>
                  Detecting Image Location
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✔</span>
                    Extract location from EXIF metadata.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✔</span>
                    Use image matching algorithms (e.g., SIFT) for comparative
                    analysis.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-500">✔</span>
                    Analyze visual features (e.g., landmarks) with AI models
                    trained on geotagged data.
                  </li>
                </ul>

                {/* Additional Task */}
                <div className="mt-4 text-sm text-gray-600">
                  Reverse geolocation can convert coordinates into readable
                  addresses.
                </div>
              </div>
            </div>
          ),
        },
        {
          key: 'Forensic',
          title: 'Forensic',
          description: 'When this picture is taken',
          content: (
            <div>
              <p>Date and time extracted from photo metadata.</p>
            </div>
          ),
        },
      ],
    };

    if (activeTab === 'Tampering_Detection') {
      return tabData.Tampering;
    } else {
      const selectedTab = tabData.OtherTabs.find(
        (tab) => tab.key === activeTab
      );
      if (selectedTab) {
        return (
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.circleWrapper}>
                <div className={styles.circle}>
                  <BiSolidCategory />
                </div>
                <div className={`${styles.title} ${inter.className}`}>
                  {selectedTab.title}
                </div>
              </div>
              <div className={styles.description}>
                {selectedTab.description}
              </div>
            </div>
            <div className={styles.content}>{selectedTab.content}</div>
          </div>
        );
      }
    }

    return <div className="h-full w-full">No content available.</div>;
  };

  return (
    <div className={styles.res_container}>
      <HeaderReport
        elaResult={elaResult}
        tagResult={tagResult}
        loadingEla={loadingEla}
        loadingTagResult={loadingTagResult}
      />
      <div className={` ${styles.res_body_container} ${inter.className}`}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} renderContent={renderContent} />
      </div>
    </div>
  );
};

export default Res;
