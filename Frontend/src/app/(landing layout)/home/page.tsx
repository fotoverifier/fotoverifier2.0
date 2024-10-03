import React from "react";
import "@/app/(landing layout)/home/home.css";
import LandingBanner from "@/components/landing_banner";
const home = () => {
  const categories = [
    "Image Assesment",
     "Relevant Image Finding",
  ];
  const links = ["upload", "link2", "link3", "link4", "link5", "link6"];
  return (
    <div className="w-full h-full">
    <div className="home-container">
      <div className="home-first-half">
        <div className="home-fh-container">
           <div className="home-fh-container-title">
           A reliable multimedia verification tool  </div> 
       
         <div className="home-fh-container-description"> Quickly verify the integrity of photos or videos with a vast array of advanced algorithms and 5 steps approach
          </div>
      
          </div>
          </div>
      <div className="home-second-half">
      <div className="upload-fcontainer">
        <div className="upload-scontainer">
          <div className="title-container"> Is this image reliable? How can we assess this image</div>
          <div className="findbyurl-container"> Find by URL</div>
          <div className="inputimg-container"> input your image </div>
          <div className="verify-agree-container"> 
          <div className="button"> Verify  </div>
          <div className="agree-section"> I agree to the terms and conditions. </div>
          </div>
        </div>
      </div>
        </div>
    </div>
    <LandingBanner/>
    </div>
  );
};

export default home;
