"use client"
import React, { useState } from 'react'
import styles from "@/app/(main layout)/libraries/libraries.module.css"
import { IoLibrary } from "react-icons/io5";
import { Inter, Montserrat } from 'next/font/google';
import DropdownButton from '@/components/button/dropdown_button';
const inter = Inter({subsets: ["latin"]});
const montserrat = Montserrat({subsets: ["latin"]});
const Libraries = () => {
  const categories = [
    "Meta-data Analysis",
     "Computational Photography",
     "Tampering detection",
     "Optical/Physical",

  ];
  const links = ["upload", "link2", "link3", "link4", "link5", "link6"];
  const [activeTab, setActiveTab] = useState('General');
  return (
  
    <div className={styles.libraries_container}>
      <div className='flex items-center h-fit w-fit p-2 rounded-full border-2 border-green-800'>
        <div className={styles.circle}> <IoLibrary/> </div>
        <div className={`ml-2 font-bold text-xl ${inter.className}`}> Forsenic Techniques </div>
      </div>
      <div className={`${styles.tab_area} font-bold flex items-center ${montserrat.className}`}>
        {categories.map((category) => (
          <div
            key={category}
            className={activeTab === category ? `${styles.tab} ${styles.active}` : styles.tab}
            onClick={() => setActiveTab(category)}
          >
            {category}
          </div>
        ))}
      </div>

      <div className={styles.content_area}>
        {activeTab === "Meta-data Analysis" && (
            <div className={styles.show_container}> abc 
            
            <DropdownButton title='Link' array={links}></DropdownButton>
            </div>
        )}
        {activeTab === "Computational Photography" && (
            <div className={styles.show_container}>Computational Photography Content</div>
        )}
        {activeTab === "Tampering detection" && (
            <div className={styles.show_container}>Tampering Detection Content</div>
        )}
        {activeTab === "Optical/Physical" && (
            <div className={styles.show_container}>Optical/Physical Content</div>
        )}
      </div>
    </div>
  );
};

export default Libraries