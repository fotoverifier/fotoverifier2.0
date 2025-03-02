import React from "react";
import styles from "@/app/(main layout)/dashboard/dashboard.module.css";
import { Inter, Poppins } from "next/font/google";
import AppIcon from "@/assets/icon.png"
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import Card_Cate from "@/components/card/card_category";
import Image_Aessment from "@/assets/Image_Asessment.svg";
import Tutorial from "@/assets/Tutorial.svg";
import { TiThLarge } from "react-icons/ti";
import { IoIosInformationCircleOutline } from "react-icons/io";
const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({subsets: ["latin"]});

const categories = [
  {
    title: "Image Assessment",
    description: "Analyze image quality, authenticity, and metadata to ensure integrity and detect potential manipulations.",
    icon: (
      <Image
        src={Image_Aessment}
        alt="Image Assessment Icon"
        width={200}
        height={200}
      />
    ),
    titleIcon: 
      1
  },
];

// 📌 Tutorials Data
const tutorials = [
  {
    title: "How to Use Our App",
    description: "Learn how to efficiently navigate our app, upload images, analyze metadata, and detect image manipulation.",
    icon: (
      <Image
        src={Tutorial}
        alt="Tutorial"
        width={200}
        height={200}
      />
    ),
    titleIcon: (
      2
    ),
  },
];
const home = () => {
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
            <Card_Cate
              key={index}
              svgIcon={category.icon}
              title={category.title}
              titleIcon={category.titleIcon}
              description={category.description}
            />
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
            <Card_Cate
              key={index}
              titleIcon={tutorial.titleIcon}
              svgIcon={tutorial.icon}
              title={tutorial.title}
              description={tutorial.description}
            />
          ))}
      </div>
      </div>
    </div>
  );
};

export default home;
