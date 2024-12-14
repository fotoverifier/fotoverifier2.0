'use client';
import React, { useEffect, useState } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import styles from '@/app/(single layout)/result2/res.module.css';
import { IoLibrary } from 'react-icons/io5';
import Tabs from '@/components/step_tab';
import Image from 'next/image';
import pattern from '@/assets/Frame 15.svg';
import { ExifData, SearchResult } from '@/interface/interface';
import { useSearchParams } from 'next/navigation';
import Image_Result from '../result/image';
import JPEG_Result from '../result/jpegGhost';
import ImgTagging_Result from '../result/osm_tags';
import MetaData_Result from '../result/metadata';
import JpegGhostResult from '../result/jpegGhost';
import ElaResult from '../result/ela';
import ReverseImgResult from '../result/reverse_img';
import pattern2 from '@/assets/Group 97.svg';
import { TbReportSearch } from 'react-icons/tb';
import { CiCamera } from 'react-icons/ci';
import { FaCamera, FaUser } from 'react-icons/fa';
import { PiAppWindowFill } from 'react-icons/pi';
import { BiSolidCategory } from 'react-icons/bi';
import MapComponent from '@/components/map/map';
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

type WebSocketUrl = {
  websocket_url: string;
};

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
  const [jpegResult, setJpegResult] = useState<string | null>(null);
  const [tagResult, setTagResult] = useState<string | null>(null);
  const [elaResult, setElaResult] = useState<string | null>(null);
  const [loadingJpegGhost, setLoadingJpegGhost] = useState<boolean>(true);
  const [loadingExifCheck, setLoadingExifCheck] = useState<boolean>(true);
  const [loadingReverseImageSearch, setLoadingReverseImageSearch] =
    useState<boolean>(true);
  const [loadingTagResult, setLoadingTagResult] = useState<boolean>(true);
  const [loadingEla, setLoadingEla] = useState<boolean>(true);

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
              setJpegResult(message.result);
              setLoadingJpegGhost(false);
            } else if (message.task === 'recognize_image') {
              setTagResult(message.result);
              setLoadingTagResult(false);
            } else if (message.task === 'ela') {
              setElaResult(message.result);
              setLoadingEla(false);
            }
          } catch (error) {
            console.error('Failed to parse wsUrls:', error);
          }
        };
        ws.onerror = (error) => {
          if (ws.readyState !== WebSocket.OPEN) {
            // Optionally, add a delay or retry mechanism here.
            return; // Skip the error logging for now
          }
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

  {
    /* TAB AREA */
  }
  const tabs = ['Overview', 'Originality', 'Where', 'When', 'Why'];

  const renderContent = (activeTab: string) => {
    const tabData = {
      Overview: (
        <div className={`h-full w-full ${styles.striped_background}`}>
          <div className={styles.Seven_content_container}>
            <div className={styles.Result_container}>
              <Image_Result img={img} />
            </div>
            <div className={styles.Result_container}>
              <JpegGhostResult
                img={`data:image/jpeg;base64,${jpegResult}`}
                loading={loadingJpegGhost}
              />
            </div>
            <div className={styles.Result_container}>
              <ElaResult
                img={`data:image/jpeg;base64,${elaResult}`}
                loading={loadingEla}
              />
            </div>
          </div>
          <div className={styles.Third_content_container}>
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

                  <div className="h-5/6 border-2 rounded-xl  w-full"></div>
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
                  <div className="h-5/6 border-2 rounded-xl  w-full"></div>

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
                <ReverseImgResult
                  searchResult={SearchResult}
                  loading={loadingReverseImageSearch}
                />
              </div>
            </div>
          ),
        },
        {
          key: 'Where',
          title: 'Where',
          description: 'Location',
          content: (
            <div className="h-full w-full">
              <p>Maps and GPS coordinates of the photos location.</p>

              <div className="h-full w-2/3 py-5">
                <MapComponent coordinate={location} />
              </div>
            </div>
          ),
        },
        {
          key: 'When',
          title: 'When',
          description: 'When this picture is taken',
          content: (
            <div>
              <p>Date and time extracted from photo metadata.</p>
            </div>
          ),
        },
        {
          key: 'Why',
          title: 'Why',
          description: 'What is the point of the image?',
          content: (
            <div>
              <p>Analysis of the photos intent or subject matter.</p>
            </div>
          ),
        },
      ],
    };

    if (activeTab === 'Overview') {
      return tabData.Overview;
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
      <div className={styles.res_header_container}>
        {/*<div className="flex items-center h-fit w-fit p-2 rounded-full border-2 border-green-800">
          <div className={styles.circle}>
            <IoLibrary />
          </div>
          <div className={`ml-2 font-bold text-xl ${inter.className}`}>
            The confident score
          </div>
        </div>*/}
        <div
          className={`text-2xl ${montserrat.className} flex h-full items-center`}
        >
          <div className={`${styles.circle} mx-3`}>
            {' '}
            <TbReportSearch />{' '}
          </div>
          <div className="font-bold"> General Report </div>
          <div className="h-full w-1 bg-white mx-5"> </div>
          <div className="text-xl"> Basic Method </div>
        </div>
        <Image
          src={pattern2}
          alt=""
          height={300}
          width={300}
          className={styles.res_header_image}
        />
      </div>
      <div className="w-full h-full">
        <Tabs tabs={tabs} renderContent={renderContent} />
      </div>
    </div>
  );
};

export default Res2;
