"use client"
import React, { useState } from 'react'
import styles from "@/app/(main layout)/libraries/libraries.module.css"
import { IoLibrary } from "react-icons/io5";
import { Inter, Montserrat } from 'next/font/google';
import DropdownButton from '@/components/button/dropdown_button';
import TreeView from './treeComponent';
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

    const treeData = [
      {
        label: 'Orignality',
        children: [
          {
            label: 'Exif Data',
          },
        ],
      },
      {
        label: 'Location',
        children: [
          {
            label: 'Extract',
          },
        ],
      },
    ];

  return (
  
    <div className={styles.libraries_container}>
      <div className='flex items-center h-fit w-fit p-2 rounded-full border-2 border-green-800'>
        <div className={styles.circle}> <IoLibrary/> </div>
        <div className={`ml-2 font-bold text-xl ${inter.className}`}> Forsenic Techniques </div>
      </div> 

      <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tree View Example</h1>
      <TreeView data={treeData} />
    </div>
    </div>
  );
};

export default Libraries