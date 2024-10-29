"use client";
import React, { useEffect, useState } from 'react'
import "@/app/(single layout)/result/result.css"
import Image from 'next/image'
import Image_Result from './image'
import MetaData_Result from './metadata'
import pattern from "@/assets/Frame 15.svg"
import { Inter } from 'next/font/google'
import { useSearchParams } from 'next/navigation'
import { Buffer } from 'buffer';
import Modification from './modification';
import Map_Res from './map';
interface ExifData {
  exif_data: any;
  software_modify?: string;
  modify_date?: string;
  original_date?: {
    original_date?: string;
    create_date?: string;
  };
  camera_information?: {
    make?: string;
    model?: string;
    exposure?: string;
    aperture?: string;
    focal_length?: string;
    iso_speed?: string;
    flash?: string;
  };
  gps_location?: string | null;
  author_copyright?: {
    author?: string | null;
    copyright_tag?: string | null;
    profile_copyright?: string | null;
  };
}
const inter = Inter({ subsets: ["latin"] });
const Result = () => {
  const searchParams = useSearchParams();
    const data = searchParams.get('data');
    const img = searchParams.get('image');
    const [exifData, setExifData] = useState<ExifData | null>(null);
    const [retrieve_img, setRetrieveImg] =  useState<string | null>(null);
    useEffect(() => {
    if (img) {
      // Set the retrieved image as base64
      setRetrieveImg(img);
      console.log(img);
    }
  }, [img])
  useEffect(() => {
      if (data) {
        const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
        setExifData(decodedData);
      }
    }, [data]);
  return (
    <>
    <div className={`Top-container ${inter.className}`}> 
        <div className='Confident-score-container'> The confident score: </div>
        <div className='vertical-space'></div>
        <div className='General-report-container'>
          <Image src={pattern} width={200} height={200} alt={''}></Image>
          GENERAL REPORT
             <Image src={pattern} width={200} height={200} alt={''}></Image>
        </div>
         </div>
    <div className={`Content-container ${inter.className}`}>
    <div className = "Half-content-container">
    <div className='Result-container'> 
        <Image_Result img={img}/>
    </div>
    <div className='Result-container'>  
         <MetaData_Result 
    cameraInformation={exifData?.exif_data?.camera_information || null} // Pass camera information as prop
  />  
    </div>
    <div className='Result-container'>   <Modification
    original_date = {exifData?.exif_data?.original_date || null}
    modify_date = {exifData?.exif_data?.modify_date || null}
    software_modify={exifData?.exif_data?.software_modify || null}
    author_copyright={exifData?.exif_data?.author_copyright || null}
  /> </div>
    </div>
    <div className = "Half-content-container">
    <div className='Result-container'> <Map_Res gps_location={exifData?.exif_data?.gps_location}/></div>
    <div className='Result-container'> Keyframe</div>
    <div className='Result-container'> OSM Tags</div>
    </div>
    </div>
    </>
  )
}

export default Result   