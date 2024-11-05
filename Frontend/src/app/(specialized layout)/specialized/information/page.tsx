"use client";
import React, { useState } from 'react'
import styles from '@/app/(specialized layout)/specialized/information/information.module.css'
import { Inter } from 'next/font/google'
import ResultTabs from '@/components/tab/tab';
import TabArea from '@/components/tab/tab';
const inter = Inter({subsets: ["latin"]})
const helperData = [
  { title: '1. EXIF Data', description: ' Details of camera settings and photo conditions.' },
  { title: '2. Geo tags', description: ' Location coordinates where the photo was taken.' },
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
  },
];


const Specialized_Information = () => {
   const [activeTab, setActiveTab] = useState('Exif Data');
  return (
    <div className='h-full w-full bg-white flex'>
     <div className={styles.home_first_half}>
               <div className={styles.helper_title}>
          <div className={`${inter.className} flex items-center`}> 
            <div className={`${styles.circle} mr-4 `}> 1. </div>
            General Information</div>
          </div>
      <div className={styles.image_container}>
        <div className={styles.change_image_section}>
        </div>
        <div className={styles.horizontal_line}></div>
        <div className={styles.show_container}>
        </div>
      </div>
    </div>
      <div className={styles.home_first_half}>
           {helperData.map((item, index) => (
                <div className={styles.helper_title_2} key={index}>
                <div className={`${inter.className} flex items-center`}>
                    {item.title}
                </div>
                {item.description && (
                    <div className='font-thin text-base ml-4'>  {item.description}</div>
                )}
                </div>
            ))}
            
        <div className={styles.result_container}>
      <TabArea activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={`${styles.content_area} ${inter.className}`}>
              {activeTab === 'Exif Data' && (
        <div className="h-full w-full p-2 flex flex-col justify-evenly">
          {exifDataSections.map((section, index) => (
            <div key={index} className="h-1/2 w-full p-2">
              <div className='flex'>
              <div className={styles.circle_2}>{index + 1}</div>
              <div className="font-bold text-lg text ml-2 mb-2">{section.title}</div>
              </div>
              {section.fields.map((field, idx) => (
                <div key={idx}>
                  <div className='font-semibold'>{field.label}:</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>

      </div>
    </div>
  )
}
  
export default Specialized_Information