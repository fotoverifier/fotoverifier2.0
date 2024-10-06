import React from "react";
import "@/app/(landing layout)/home/home.css";
import LandingBanner from "@/components/landing_banner";
import { FaChevronDown } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import Image from "next/image";
import Detail from "@/assets/Group_29.svg";
const home = () => {
  const categories = [
    "Image Assesment",
     "Relevant Image Finding",
  ];
  const links = ["upload", "link2", "link3", "link4", "link5", "link6"];
  return (
    <div className="w-full h-full">
    <div className="home-container">
      <div className="home-first-half flex-col">
        <div className="home-fh-container justify-between">
           <div className="home-fh-container-title mb-4">
           A reliable multimedia verification tool  </div> 
       
         <div className="home-fh-container-description mb-4"> Quickly verify the integrity of photos or videos with a vast array of advanced algorithms and 5 steps approach
          </div>
          <div className="detail-button flex items-center mb-4"> For detail Assesment 
            <FaArrowRightLong className="ml-5"/>
            </div> 
             <Image src={Detail} height={200} width={200} alt={""} className=""></Image>
          </div>
          </div>
      <div className="home-second-half">
      <div className="upload-fcontainer">
        <div className="upload-scontainer">
          <div className="title-container"> Is this image reliable? How can we assess this image</div>
          <div className="findbyurl-container"> Find by URL</div>
          <div className="inputimg-container flex justify-center items-center flex-col">
            
             <div className="button-choose-file"> 
              <div className="w-3/4 flex justify-center"> Choose your file  </div>
             
              <div className ="vertical-line"></div>
              <div className="w-1/4 h-full flex items-center justify-center"> 
              <FaChevronDown/>
              </div>
             </div>
             <div> or drag your file here</div>
              </div>
          <div className="verify-agree-container"> 
          <div className="button"> Verify  </div>
          <div className="agree-section"> I agree to the terms and conditions. </div>
          </div>
          <div></div>
        </div>
      </div>
        </div>
    </div>
    <LandingBanner/>
    </div>
  );
};

export default home;
