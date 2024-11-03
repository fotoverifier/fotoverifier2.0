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
const Specialized_Information = () => {
   const [activeTab, setActiveTab] = useState('General');
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

      <div className={styles.content_area}>
        {activeTab === 'General' ? (
          <div className={styles.content}>
            <div className={styles.show_container}>Classification</div>
            <div className={styles.horizontal_line}></div>
            <div className={styles.show_container}>Probability Breakdown</div>
          </div>
        ) : (
          <div>Reversed Image Content</div>
        )}
      </div>
    </div>

      </div>
    </div>
  )
}
  
export default Specialized_Information