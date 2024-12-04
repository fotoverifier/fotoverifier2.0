import React from "react";
import styles from "@/app/(main layout)/dashboard/home.module.css";
import { Inter, Poppins } from "next/font/google";
import AppIcon from "@/assets/icon.png"
import Image from "next/image";
import { Montserrat } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({subsets: ["latin"]});
const home = () => {
  const categories = [
    "Image Assesment",
     "Relevant Image Finding",
  ];
  const links = ["upload", "link2"];
  const tutorials = [
    "How to assess image",
    "How to reverse image",
  ]
  return (
     <div className={`${styles.home_container2} ${montserrat.className}`}>
      <div className={styles.content_fcontainer}> 
         <div className={styles.space}></div>
        <div className={`font-bold ${styles.fcontainer_title}`}>
           Our services
        </div>
        <div className={styles.space}></div>
         <div className={styles.dashboard_categories}>
        {categories.map((category, index) => (
          <div key={index} className={`${styles.category_container} ${styles.ml_10}`}>
            <a href={links[index]} className={styles.dashboard_category_item}>
              <div className={styles.image_container}>
                <Image src={AppIcon} alt=''></Image>
              </div>
               <div className={styles.horizontal_bar}></div>
              <span className={` ${inter.className}`}> {category}</span>
            </a>
          </div>
        ))}
      </div>
      </div>
      <div className={styles.vertical_bar}></div>
      <div className={styles.content_fcontainer}> 
           <div className={styles.space}></div>
           <div className={`font-bold ${styles.fcontainer_title}`}>
          Tutorial
        </div>
        <div className={styles.space}></div>
          <div className={styles.dashboard_categories}>
        {tutorials.map((tutorial, index) => (
          <div key={index} className={`${styles.category_container} ${styles.ml_10}`}>
            <a href={links[index]} className={styles.dashboard_category_item}>
              <div className={styles.image_container}></div>
               <div className={styles.horizontal_bar}></div>
                    <span className="font-semibold"> {tutorial}</span>
            </a>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default home;
