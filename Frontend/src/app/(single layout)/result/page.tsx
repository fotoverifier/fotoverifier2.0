import React from 'react'
import "@/app/(single layout)/result/result.css"
import Image from 'next/image'
import Image_Result from './image'
import MetaData_Result from './metadata'
import pattern from "@/assets/Frame 15.svg"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ["latin"] });
const result = () => {
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
        <Image_Result/>
    </div>
    <div className='Result-container'>  
        <MetaData_Result/> 
    </div>
    <div className='Result-container'> Object Detection</div>
    </div>
    <div className = "Half-content-container">
    <div className='Result-container'> Map</div>
    <div className='Result-container'> Keyframe</div>
    <div className='Result-container'> OSM Tags</div>


    </div>
    </div>
    </>
  )
}

export default result   