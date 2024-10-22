import React from "react";
import "@/styles/banner.css";
import Image from "next/image";
import { Inter, Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"] });
import Pattern from "@/assets/Group 52.svg";
import iconSrc from "@/assets/icon_main_white.svg";
const Banner = () => {
  return (
    <div className={`banner-container flex-col ${inter.className}`}>
      <div className="flex ml-auto">
      <div className="mr-5 w-fit h-fit border-gray-800 border p-2 rounded-sm"> Feedback</div>
      <div className="mr-20  w-fit h-fit border-gray-800 border p-2 rounded-sm"> Homepage</div>
      </div>
      <div className="primary-container flex">This is a tool for detecting image tampering using Digital Image Forensics techniques,
         aiming to provide both professional as well as casual users with reliable tools to verify images  
          <Image src={Pattern} width={700} height={700} alt = ""></Image>
         </div>
    </div>
  );
};

export default Banner;
