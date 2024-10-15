import React from "react";
import "@/app/(main layout)/dashboard/home.css";

const home = () => {
  const categories = [
    "Image Assesment",
     "Relevant Image Finding",
  ];
  const links = ["upload", "link2"];
  return (
    <div className="home-container">
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
               <div className='vertical-bar'> </div>
              {category}
            </a>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default home;
