'use client';
import React, { useEffect, useState } from 'react';
import styles from '@/app/(specialized layout)/specialized/information/information.module.css';
import { Inter, Montserrat } from 'next/font/google';
import ResultTabs from '@/components/tab/tab';
import TabArea from '@/components/tab/tab';
import { ExifData, SearchResult, Tagging } from '@/interface/interface';
import default_img from "@/assets/icon.png"
type WebSocketUrl = {
  websocket_url: string;
};

import {
  FaExchangeAlt,
  FaImage,
  FaInfoCircle,
  FaMap,
  FaTags,
} from 'react-icons/fa';
import Exif from '@/assets/exif.png';
import { BsFillGeoAltFill } from 'react-icons/bs';
import { useSearchParams } from 'next/navigation';
import { MdDescription } from 'react-icons/md';
import Image from 'next/image';
import { IoInformation } from 'react-icons/io5';
import { IoMdPerson } from 'react-icons/io';
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({subsets: ['latin']});
const helperData = [
  {
    title: 'EXIF Data',
    description: ' Details of camera settings and photo conditions.',
    icon: Exif,
  },
  {
    title: 'Can EXIF Data be restored?',
    description: ' Once stripped, EXIF Data are no longer available.',
    icon: null,
  },
];

const exifDataSections = [
  {
    title: 'Information of the device',
    fields: [
      { label: 'Make' },
      { label: 'Model' },
      { label: 'Exposure' },
      { label: 'Aperture' },
      { label: 'Focal Length' },
      { label: 'ISO Speed' },
      { label: 'Flash' },
    ],
    description: 'Displays camera settings and specifications',
    icon: <IoInformation />
  },
  {
    title: 'Modification and Author',
    fields: [
      { label: 'Software Modified' },
      { label: 'Modification Date' },
      { label: 'Original Date' },
      { label: 'Create Date' },
      { label: 'Author' },
      { label: 'Copyright Tag' },
      { label: 'Profile Copyright' },
    ],
    description: 'Timestamp and Noticable Modifications',
    icon: <IoMdPerson />
  },
];


const exampleExifData: ExifData = {
  exif_data: {},
  software_modify: 'Photoshop',
  modify_date: '2024-12-01',
  original_date: {
    original_date: '2024-11-30',
    create_date: '2024-11-29',
  },
  camera_information: {
    make: 'Canon',
    model: 'EOS 5D',
    exposure: '1/200',
    aperture: 'f/2.8',
    focal_length: '50mm',
    iso_speed: '100',
    flash: 'No',
  },
  gps_location: "null",
  author_copyright: {
    author: 'John Doe',
    copyright_tag: '© 2024 John Doe',
    profile_copyright: 'All rights reserved',
  },
};


const GeoTag = [
  {
    title: 'Geographical Information',
    fields: [
      { label: 'Longtitude' },
      { label: 'Model' },
      { label: 'Exposure' },
    ],
  },
];
const result = 'bat | catch | fly | girl | hang | stand | tree | woman | wood';
const Specialized_Information = () => {
  const searchParams = useSearchParams();
  const imgSrc = searchParams.get('image');
   const wsUrls = searchParams.get('wsUrls');
  const splitResult = result.split(' | ');

  const [activeTab, setActiveTab] = useState('Exif Data');


    const [exifResult, setExifResult] = useState<ExifData | null>({
    exif_data: {}, // Replace with actual exif data if available
    software_modify: 'Photoshop',
    modify_date: '2024-12-01',
    original_date: {
      original_date: '2024-11-30',
      create_date: '2024-11-29',
    },
    camera_information: {
      make: 'Canon',
      model: 'EOS 5D',
      exposure: '1/200',
      aperture: 'f/2.8',
      focal_length: '50mm',
      iso_speed: '100',
      flash: 'No',
    },
    gps_location: '37.7749° N, 122.4194° W',
    author_copyright: {
      author: 'John Doe',
      copyright_tag: '© 2024 John Doe',
      profile_copyright: 'All rights reserved',
    },
  });

  
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

  return (
    <div className="h-full w-full bg-white flex">
      <div className={styles.home_first_half}>
        <div className={styles.helper_title}>
          <div className={`${inter.className} flex items-center h-fit w-fit p-2 rounded-full border-2 border-green-800 font-bold text-xl`}>
            <div className={`${styles.circle} mr-4 `}>
              {' '}
              <FaInfoCircle />{' '}
            </div>
            General Information
          </div>
        </div>
        <div className={styles.image_container}>
          <div className={styles.change_image_section}>
            <div className={`mr-5 ${inter.className} font-bold`}>
              {' '}
              Change your image
            </div>
            <FaExchangeAlt className={styles.title_button} />
          </div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.show_container}>
            <div className="flex mr-auto">
              <div className={styles.circle_2}>
                <FaImage />
              </div>
              <div className={`font-bold text-lg ml-2 mb-2 border-b-2 border-black ${montserrat.className}`}> Image </div>
            </div>
            <div className='flex justify-center items-center h-full w-full'> 
            <div className={styles.image_container2}>
            <Image 
              src={imgSrc || default_img} 
              alt="Selected image" 
              layout="fill" 
              style={{ objectFit: 'cover' }}
              className={styles.image}
            />
          </div>
          </div>
          </div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.tagging_container}>
            <div className="flex mr-auto">
              <div className={styles.circle_2}>
                <FaTags />
              </div>
              <div className={`font-bold text-lg ml-2 mb-2 border-b-2 border-black ${montserrat.className}`}>Tagging </div>
            </div>

            <div className="flex flex-wrap">
              {splitResult.map((item, index) => (
                <span key={index} className="mr-2 mb-2 p-2 border rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.home_second_half}>
        {helperData.map((item, index) => (
          <div className={styles.helper_title_2} key={index}>
            <div className={`font-bold text-lg ml-2 mb-2 border-b-2 border-black ${montserrat.className}`}>
              {item.title}
            </div>
            {item.description && (
              <div className={`font-normal text-base ml-4 ${inter.className}`}>
                {' '}
                {item.description}
              </div>
            )}
          </div>
        ))}

        <div className={styles.result_container}>
          <TabArea activeTab={activeTab} onTabChange={setActiveTab} />

          <div className={`${styles.content_area} ${inter.className}`}>
            {activeTab === 'Exif Data' && exifResult && (
            <div className="h-full w-full p-2 flex flex-col justify-evenly">
              {exifDataSections.map((section, index) => (
                <div key={index} className="h-1/2 w-full p-2">
                  <div className="flex">
                    <div className={styles.circle_2}>{section.icon}</div>
                    <div className={`font-bold text-lg ml-2 mb-2 border-b-2 border-black ${montserrat.className}`}>
                      {section.title}
                    </div>
                    <div className={`font-base text-base ml-2 mb-2 self-center ${inter.className}`}>
                      {section.description}
                    </div>
                  </div>
                  {section.fields.map((field, idx) => {
                    // Map field labels to values in exifResult
                    let value;
                    switch (field.label) {
                      case 'Make':
                        value = exifResult.camera_information?.make;
                        break;
                      case 'Model':
                        value = exifResult.camera_information?.model;
                        break;
                      case 'Exposure':
                        value = exifResult.camera_information?.exposure;
                        break;
                      case 'Aperture':
                        value = exifResult.camera_information?.aperture;
                        break;
                      case 'Focal Length':
                        value = exifResult.camera_information?.focal_length;
                        break;
                      case 'ISO Speed':
                        value = exifResult.camera_information?.iso_speed;
                        break;
                      case 'Flash':
                        value = exifResult.camera_information?.flash;
                        break;
                      case 'Software Modified':
                        value = exifResult.software_modify;
                        break;
                      case 'Modification Date':
                        value = exifResult.modify_date;
                        break;
                      case 'Original Date':
                        value = exifResult.original_date?.original_date;
                        break;
                      case 'Create Date':
                        value = exifResult.original_date?.create_date;
                        break;
                      case 'Author':
                        value = exifResult.author_copyright?.author;
                        break;
                      case 'Copyright Tag':
                        value = exifResult.author_copyright?.copyright_tag;
                        break;
                      case 'Profile Copyright':
                        value = exifResult.author_copyright?.profile_copyright;
                        break;
                      default:
                        value = 'N/A';
                    }
                    return (
                      <div key={idx} className="flex">
                        <div className="font-semibold">{field.label}:</div>
                        <div className="ml-2 text-gray-600">{value || 'N/A'}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}

            {activeTab === 'Geo Tags' && (
              <div className="h-full w-full p-2 flex flex-col justify-evenly">
                {GeoTag.map((section, index) => (
                  <div key={index} className="h-1/3 w-full p-2">
                    <div className="flex">
                      <div className={styles.circle_2}>
                        <BsFillGeoAltFill />
                      </div>
                      <div className="font-bold text-lg text ml-2 mb-2">
                        {section.title}
                      </div>
                    </div>
                    {section.fields.map((field, idx) => (
                      <div key={idx}>
                        <div className="font-semibold">{field.label}:</div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="h-2/3 w-full p-2">
                  <div className="flex">
                    <div className={styles.circle_2}>
                      <FaMap />
                    </div>
                    <div className="font-bold text-lg text ml-2 mb-2"> Map</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialized_Information;
