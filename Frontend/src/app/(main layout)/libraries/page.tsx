import React from 'react'
import "@/app/(main layout)/libraries/libraries.css";
import { IoIosSearch } from "react-icons/io";

const libraries = () => {
  const categories = [
    "Item 1",
     "Item 2",
  ];
  const links = ["upload", "link2", "link3", "link4", "link5", "link6"];
  return (
    <div className="libraries-container">
      <div className='libraries-title-container'> 
        <div className='flex'> 
        <IoIosSearch size={30}/>

      <div className="libraries-title"> You may want to try</div>
      </div>
      </div>
      <div className="libraries-categories mt-5">
        {categories.map((category, index) => (
          <div key={index} className="category-container ml-10">
            <a href={links[index]} className="libraries-category-item">
              {category}
              <div className='vertical-bar'> </div>
              <div > Contexto</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default libraries