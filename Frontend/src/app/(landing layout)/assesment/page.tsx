"use client"
import React, { useState } from 'react'
import styles from "@/app/(landing layout)/assesment/assesment.module.css"

import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({subsets: ["latin"]});
const Assesment = () => {
 const [activeTab, setActiveTab] = useState('General');

  
   return (
    <div className={styles.assess_container}>
      <div className={styles.home_first_half}>
        <div className={styles.image_container}>
          <div className={styles.change_image_section}></div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.show_container}></div>
          <div className={styles.horizontal_line}></div>
          <div className={styles.show_container}></div>
        </div>
      </div>
      <div className={`${styles.home_first_half} flex-col`}>
        <div className={`${styles.title_container} ${montserrat.className}`}>
          Assess by yourself
        </div>
        <div className={`${styles.result_container} ${montserrat.className}`}>
          <div className={`${styles.tab_area} font-bold`}>
            <button
              className={activeTab === 'General' ? `${styles.tab} ${styles.active}` : styles.tab}
              onClick={() => setActiveTab('General')}
            >
              General Result
            </button>
            <div className={styles.vertical_line}></div>
            <button
              className={activeTab === 'Reversed' ? `${styles.tab} ${styles.active}` : styles.tab}
              onClick={() => setActiveTab('Reversed')}
            >
              Reversed Image
            </button>
          </div>

          <div className={styles.content_area}>
            {activeTab === 'General' ? (
              <div className="w-full h-full flex flex-col justify-evenly">
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
  );
};

export default Assesment;