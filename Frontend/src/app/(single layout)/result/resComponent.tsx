'use client';
import React, { useEffect, useState, Suspense, useRef, act } from 'react';
import { Inter, Montserrat } from 'next/font/google';
import styles from '@/app/(single layout)/result/res.module.css';
import Tabs from '@/components/tab/step_tab';
import Image from 'next/image';
import { ExifData, SearchResult } from '@/interface/interface';
import { useSearchParams } from 'next/navigation';
import Image_Result from './technique/image';
import ImgTagging_Result from './technique/osm_tags';
import MetaData_Result from './technique/metadata';
import JpegGhostResult from './technique/jpegGhost';
import ElaResult from './technique/ela';
import ReverseImgResult from './technique/reverse_img';

import { FaCamera, FaUser } from 'react-icons/fa';
import { PiAppWindowFill } from 'react-icons/pi';
import { BiSolidCategory } from 'react-icons/bi';
import MapComponent from '@/components/map/map';

import { FiMapPin } from 'react-icons/fi';
const inter = Inter({ subsets: ['latin'] });
import unknown_author from '@/assets/unknown_author.jpg';
import HeaderReport from '@/components/head/head_result';
import { TabProvider } from '@/context/tabContext';
import FakeShieldApp from './technique/fakeshieldapi';
import LocationSection from './technique/locationSection';
import MetaDataPage from './technique/metadata';

const Res = () => {
  const location: [number, number] = [51.505, -0.09];
  {
    /* SERVER AREA */
  }

  const searchParams = useSearchParams();
  const img = searchParams.get('image');
  const taskId = searchParams.get('task_id');

  const [results, setResults] = useState<any[]>([]);

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
    if (!img || !taskId) return;

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/quick-scan-stream/?task_id=${taskId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received:', data);

        if (data.status === 'done') {
          console.log('All tasks completed. Closing SSE...');
          eventSource.close();
          return;
        }

        if (!data?.result?.result?.method) {
          console.warn('Unexpected SSE data format:', data);
          return; // Skip this iteration if 'method' is missing
        }

        switch (data.result.result.method) {
          case 'exif':
            setExifResult(data.result.result.exif_data);
            setLoadingExifCheck(false);
            break;
          case 'jpeg_ghost':
            setJpegGhostResult(data.result.result.jpeg_ghost);
            setLoadingJpegGhost(false);
            break;
          case 'ram':
            setTagResult(data.result.result.recognized_objects);
            setLoadingTagResult(false);
            break;
          case 'reverse_search':
            setSearchResult(data.result.result.reverse_search.image_results);
            setLoadingReverseImageSearch(false);
            break;
          case 'ela':
            setElaResult(data.result.result.ela_image);
            setLoadingEla(false);
            break;
          default:
            console.warn('Unknown task received:', data.task);
        }

        setResults((prevResults) => [...prevResults, data]);
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.log(eventSource.readyState);
      if (
        eventSource.readyState === EventSource.CLOSED ||
        eventSource.readyState == 0
      )
        return; // Skip if connection is closed
      else console.error('SSE connection error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const renderContent = (activeTab: string) => {
    const tabData = {
      Tampering: (
        <div className={`h-full w-full ${styles.striped_background}`}>
          <div className={styles.Seven_content_container}>
            <div id="img" className={styles.Result_container}>
              <Image_Result img={img} />
            </div>
            <div id="jpeg_ghost" className={styles.Result_container}>
              <JpegGhostResult
                images={jpegGhostResult}
                loading={loadingJpegGhost}
              />
            </div>
            <div id="ela" className={styles.Result_container}>
              <ElaResult
                img={`data:image/jpeg;base64,${elaResult}`}
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
            <div className="w-full h-full flex flex-col md:flex-row gap-6  bg-yellow-50 p-6 rounded-xl">
              <div
                className="w-full md:w-1/3 h-full flex flex-col gap-4"
                id="CameraArea"
              >
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-10 h-10 shadow-sm">
                      <FaCamera size={18} />
                    </div>
                    <h3 className="font-bold text-lg ml-3 text-teal-800">
                      Camera Information
                    </h3>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-center bg-gray-50 h-64">
                    <Image
                      src={
                        exifResult?.camera_information?.camera_image
                          ?.image_url || unknown_author
                      }
                      alt="Camera Image"
                      width={180}
                      height={180}
                      className="object-contain"
                    />
                  </div>

                  
                  <div className="mt-4 grid grid-cols-2 gap-2  text-sm">
                    <div className="text-gray-500">Make:</div>
                    <div className="font-bold text-teal-800">
                      {exifResult?.camera_information?.make || 'Unknown'}
                    </div>

                    <div className="text-gray-500">Model:</div>
                    <div className="font-bold text-teal-800">
                      {exifResult?.camera_information?.model || 'Unknown'}
                    </div>

                    <div className="text-gray-500">Software modify:</div>
                    <div className="font-bold text-teal-800">
                      {(exifResult?.software_modify?.replace(/^Image edited with:\s*/i, '') || 'Unknown')}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="w-full md:w-1/3 h-full flex flex-col gap-4"
                id="AuthorArea"
              >
                <div className="bg-white rounded-xl shadow-sm p-4 flex-grow">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-10 h-10 shadow-sm">
                      <FaUser size={18} />
                    </div>
                    <h3 className="font-bold text-lg ml-3 text-teal-800">
                      Author Information
                    </h3>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-center bg-gray-50 h-64">
                    <Image
                      src={
                        exifResult?.author_copyright?.author_image
                          ?.image_results?.[0].original || unknown_author
                      }
                      alt="Author Image"
                      width={180}
                      height={180}
                      className="object-contain"
                    />
                  </div>

                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <div className="text-sm">
                      <span className="font-medium text-teal-800">
                        Copyright:{' '}
                      </span>
                      <span className="text-gray-700">
                        {exifResult?.author_copyright?.profile_copyright ||
                          'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div
                  className="bg-white rounded-xl shadow-sm p-4 flex-1"
                  id="ReversedImg"
                >
                  <ReverseImgResult
                    searchResult={SearchResult}
                    loading={loadingReverseImageSearch}
                  />
                </div>

                <div
                  className="bg-white rounded-xl shadow-sm p-4 flex-1"
                  id="ImgTagging"
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
          content: <LocationSection exifResult={exifResult}></LocationSection>,
        },
        {
          key: 'Forensic',
          title: 'Forensic',
          description:
            'Apply state-of-the-art AI to assist the verification process.',
          content: (
            <div className="overflow-hidden h-full">
              <FakeShieldApp></FakeShieldApp>
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
              <div className={`${styles.description} flex items-center`}>
                {selectedTab.description}
              {(() => {
                switch (selectedTab.title) {
                  case "Originality":
                    return <div className='ml-auto'> <MetaDataPage cameraInformation ={exifResult?.camera_information} software_modify={exifResult?.software_modify}
                    modify_date={exifResult?.modify_date}
                    original_date={exifResult?.original_date}
                    author_copyright={exifResult?.author_copyright}
                    gps_location={exifResult?.gps_location}
                    loading ={false}
                    ></MetaDataPage></div>;
                  default:
                    return null;
                }
              })()}

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
    <TabProvider>
      <div className={styles.res_container}>
        <HeaderReport
          elaResult={elaResult}
          tagResult={tagResult}
          loadingEla={loadingEla}
          loadingJpegGhost={loadingJpegGhost}
          loadingTagResult={loadingTagResult}
        />
        <div className={` ${styles.res_body_container} ${inter.className}`}>
          <Tabs renderContent={renderContent} />
        </div>
      </div>
    </TabProvider>
  );
};

export default Res;
