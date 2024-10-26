import React from "react";
import "@/app/(main layout)/dashboard/home.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
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
     <div className={`home-container2 ${inter.className}`}>
      <div className="content-fcontainer"> 
         <div className="space"></div>
        <div className="fcontainer-title">
           Our services </div>
        <div className="space"></div>
         <div className="dashboard-categories">
        {categories.map((category, index) => (
          <div key={index} className="category-container ml-10">
            <a href={links[index]} className="dashboard-category-item">
              <div className="image-container"></div>
               <div className='horizontal-bar'> </div>
              {category}
            </a>
          </div>
        ))}
      </div>
      </div>
      <div className="vertical-bar"></div>
      <div className="content-fcontainer"> 
           <div className="space"></div>
        <div className="fcontainer-title">
          Tutorial </div>
        <div className="space"></div>
          <div className="dashboard-categories">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="category-container ml-10">
            <a href={links[index]} className="dashboard-category-item">
              <div className="image-container"></div>
               <div className='horizontal-bar'> </div>
              {tutorial}
            </a>
          </div>
        ))}
      </div>
        </div>
    </div>
  );
};

export default home;
