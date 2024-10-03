import React from "react";
import "@/app/(main layout)/dashboard/home.css";

const home = () => {
  const categories = [
    "Image Assesment",
     "Relevant Image Finding",
  ];
  const links = ["upload", "link2", "link3", "link4", "link5", "link6"];
  return (
    <div className="home-container">
      <div className="home-title bg-slate-400"> You may want to try</div>
      <div className="home-categories">
        {categories.map((category, index) => (
          <div key={index} className="category-container ml-10">
            <a href={links[index]} className="home-category-item">
              {category}
            </a>
            <div className="category-title">{category}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default home;
