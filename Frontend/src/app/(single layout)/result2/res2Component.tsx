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
import pattern2 from '@/assets/Group 97.svg';
import { TbReportSearch } from 'react-icons/tb';
import { FaCamera, FaExchangeAlt, FaUser } from 'react-icons/fa';
import { PiAppWindowFill } from 'react-icons/pi';
import { BiSolidCategory } from 'react-icons/bi';
import MapComponent from '@/components/map/map';
import { TiExport } from 'react-icons/ti';
import Modal_PReport from '@/components/modal/PReport_modal';
import { FiMapPin } from 'react-icons/fi';
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

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
          try {
            const message = JSON.parse(event.data);
            console.log('Message:', message);

            // Handling different tasks based on the WebSocket message
            switch (message.task) {
              case 'ela':
                if (message.result === 'completed') ws.close();
                else {
                  setElaResult(message.result);
                  setLoadingEla(false);
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
              case 'recognize_image':
                if (message.result !== 'completed') {
                  setTagResult(message.result);
                  setLoadingTagResult(false);
                }
                break;
              default:
                console.log('Unknown task type:', message.task);
                break;
            }
          } catch (error) {
            console.error('Failed to parse wsUrls:', error);
          }
        };
        ws.onerror = (error) => {
          return;
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

  const tabs = ['Tampering Detection', 'Originality', 'Location', 'Forsenic'];

  const renderContent = (activeTab: string) => {
    const tabData = {
      Tampering: (
        <div className={`h-full w-full ${styles.striped_background}`}>
          <div className={styles.Seven_content_container}>
            <div className={styles.Result_container}>
              <Image_Result img={img} />
            </div>
            <div className={styles.Result_container}>
              <JpegGhostResult
                images={jpegResult}
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
              <div className='h-1/2'> 
                <ReverseImgResult
                  searchResult={SearchResult}
                  loading={loadingReverseImageSearch}
                />
                </div>
                <div className='h-1/2'>
                  <ImgTagging_Result Tag={tagResult} loading={loadingTagResult} />
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
                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                      <div className="mr-2 flex items-center justify-center bg-green-200 text-green-900 rounded-full w-8 h-8">
                        <FiMapPin size={16} /> {/* Icon */}
                      </div>
                      Detecting Image Location
                    </h3>

                  {/* List of Techniques */}
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-500">✔</span>
                      Extract location from EXIF metadata.
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-500">✔</span>
                      Use image matching algorithms (e.g., SIFT) for comparative analysis.
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-500">✔</span>
                      Analyze visual features (e.g., landmarks) with AI models trained on geotagged data.
                    </li>
                  </ul>

                  {/* Additional Task */}
                  <div className="mt-4 text-sm text-gray-600">
                    Reverse geolocation can convert coordinates into readable addresses.
                  </div>
                </div>
            </div>
          ),
        },
        {
          key: 'Forsenic',
          title: 'Forsenic',
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
            <TbReportSearch />
          </div>
          <div className="font-bold"> General Report </div>
          <div className="h-full w-1 bg-white mx-5"> </div>
          <div className="text-xl"> Basic Method </div>
          <div className="relative group mx-5">
            <div className="border-2 border-white p-2 rounded-full cursor-pointer hover:bg-green-900 flex items-center justify-center">
              <FaExchangeAlt />
            </div>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Change method
            </span>
          </div>

         <div className="relative group">
           <div onClick={() => setIsModalOpen(true)} className="focus:outline-none ml-auto">
            <div className="border-2 border-white p-2 rounded-full cursor-pointer hover:bg-green-900 flex items-center justify-center">
              <TiExport />
               </div>
            </div>
            <Modal_PReport 
              isOpen={isModalOpen} 
              closeModal={() => setIsModalOpen(false)} 
              jpegResult={jpegResult}
              elaResult={elaResult}
              tagResult={tagResult}
              loadingJpegGhost={loadingJpegGhost}
              loadingEla={loadingEla}
              loadingTagResult={loadingTagResult}
            />           

           <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap truncate">
              Generate a portable report
            </span>
          </div>
        </div>
        <Image
          src={pattern2}
          alt=""
          height={300}
          width={300}
          className={styles.res_header_image}
        />
      </div>
      <div className={` ${styles.res_body_container} ${inter.className}`}>
        <Tabs tabs={tabs} renderContent={renderContent} />
      </div>
    </div>
  );
};

export default Res2;
