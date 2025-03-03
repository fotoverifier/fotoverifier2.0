'use client';
import React, { useEffect, useState, Suspense, useRef } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import styles from '@/app/(single layout)/result2/res.module.css';
import Tabs from '@/components/step_tab';
import Image from 'next/image';
import { ExifData, SearchResult } from '@/interface/interface';
import { useSearchParams } from 'next/navigation';
import Image_Result from '../result/image';
import ImgTagging_Result from '../result/osm_tags';
import MetaData_Result from '../result/metadata';
import JpegGhostResult from '../result/jpegGhost';
import ElaResult from '../result/ela';
import ReverseImgResult from '../result/reverse_img';

import { FaCamera, FaExchangeAlt, FaSortDown, FaSortUp, FaUser } from 'react-icons/fa';
import { PiAppWindowFill } from 'react-icons/pi';
import { BiSolidCategory } from 'react-icons/bi';
import MapComponent from '@/components/map/map';

import { FiHelpCircle, FiMapPin } from 'react-icons/fi';
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
import unknown_author from '@/assets/unknown_author.jpg';
import HeaderReport from '@/components/head/head_result';

const Res2 = () => {
  const location: [number, number] = [51.505, -0.09];
  {
    /* SERVER AREA */
  }

  const searchParams = useSearchParams();
  const img = searchParams.get('image');
  const wsUrls = searchParams.get('wsUrls');

  const [exifResult, setExifResult] = useState<ExifData | null>(null);
  const [SearchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [jpegResult, setJpegResult] = useState<string[] | null>(null);
  const [tagResult, setTagResult] = useState<string | null>(null);
  const [elaResult, setElaResult] = useState<string | null>(null);
  const [loadingJpegGhost, setLoadingJpegGhost] = useState<boolean>(true);
  const [loadingExifCheck, setLoadingExifCheck] = useState<boolean>(true);
  const [loadingReverseImageSearch, setLoadingReverseImageSearch] =
    useState<boolean>(true);
  const [loadingTagResult, setLoadingTagResult] = useState<boolean>(true);
  const [loadingEla, setLoadingEla] = useState<boolean>(true);
  var completedTasks = new Set();
  const totalTasks = [
    'jpeg_ghost',
    'ela',
    'exif_check',
    'reverse_image_search',
    'recognize_image',
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
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
          const message = JSON.parse(event.data);
          console.log('Message:', message);
          try {
            

            // Handling different tasks based on the WebSocket message
            switch (message.task) {
              case 'ela':
                if (message.result !== 'completed') {
                  setElaResult(message.result);
                  setLoadingEla(false);
                }
                break;
              case 'recognize_image':
                if (message.result !== 'completed') {
                  setTagResult(message.result);
                  setLoadingTagResult(false);
                }
                break;
              case 'exif_check':
                if (message.result !== 'completed') {
                  setExifResult(message.result);
                  setLoadingExifCheck(false);
                }
                break;
              case 'reverse_image_search':
                if (message.result !== 'completed') {
                  setSearchResult(message.result.image_results);
                  setLoadingReverseImageSearch(false);
                }
                break;
              case 'jpeg_ghost':
                if (message.result !== 'completed') {
                  setJpegResult(message.result);
                  setLoadingJpegGhost(false);
                }
                break;

              default:
                console.log('Unknown task type:', message.task);
                break;
            }
            if (message.result === 'completed') {
              completedTasks.add(message.task);
            }

            // Close WebSocket only if all tasks are completed
            if (completedTasks.size === totalTasks.length) {
              ws.close();
            }
          } catch (error) {
            console.error('Failed to parse wsUrls:', error);
          }
        };
        ws.onerror = (error) => {
          console.error('WebSocket Error:', error);
        };
        return () => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.close();
          }
        };
      } catch (error) {
        console.error('Failed to parse wsUrls:', error);
      }
    }
  }, [wsUrls]);

  const tabs = ['Tampering Detection', 'Originality', 'Location', 'Forensic'];

  const renderContent = (activeTab: string) => {
    const tabData = {
      Tampering: (
        <div className={`h-full w-full ${styles.striped_background}`}>
            <div  className={styles.Seven_content_container}>
              <div id="help-target" className={styles.Result_container}>
                  <Image_Result img={img} />
                </div>
            <div id="help-target2" className={styles.Result_container}>
              <JpegGhostResult images={jpegResult} loading={loadingJpegGhost} />
            </div>
            <div id="help-target3" className={styles.Result_container}>
              <ElaResult
                img={`data:image/jpeg;base64,${elaResult}`}
                loading={loadingEla}
              />
            </div>
          </div>

          {/* <div className={styles.Third_content_container}>
            <div className={styles.Result_container}>
              <MetaData_Result
                cameraInformation={exifResult?.camera_information || undefined}
                original_date={exifResult?.original_date || undefined}
                modify_date={exifResult?.modify_date || undefined}
                software_modify={exifResult?.software_modify || undefined}
                author_copyright={exifResult?.author_copyright || undefined}
                gps_location={exifResult?.gps_location}
                loading={loadingExifCheck}
              />
            </div>
            <div className={styles.Result_container}>
              <ReverseImgResult
                searchResult={SearchResult}
                loading={loadingReverseImageSearch}
              />
            </div>
            <div className={styles.Result_container}>
              <ImgTagging_Result Tag={tagResult} loading={loadingTagResult} />
            </div>
          </div>*/}
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
                <div className="h-1/6 w-full">
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
                <div className="h-5/6 w-fulll">
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
                <div className="h-5/6 w-fulll">
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
              </div>

              <div className="h-full w-[0.5px] bg-slate-300 mx-5"></div>

              <div className="w-1/3 h-full">
                <div className="h-1/2">
                  <ReverseImgResult
                    searchResult={SearchResult}
                    loading={loadingReverseImageSearch}
                  />
                </div>
                <div className="h-1/2">
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

    if (activeTab === 'Tampering Detection') {
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
          jpegResult={jpegResult}
          elaResult={elaResult}
          tagResult={tagResult}
          loadingJpegGhost={loadingJpegGhost}
          loadingEla={loadingEla}
          loadingTagResult={loadingTagResult}
        />
      <div className={` ${styles.res_body_container} ${inter.className}`}>
        <Tabs tabs={tabs} renderContent={renderContent} />
      </div>
    </div>
  );
};

export default Res2;
