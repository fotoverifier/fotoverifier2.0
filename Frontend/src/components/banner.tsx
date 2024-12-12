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
    <div className={`banner-container flex-col ${montserrat.className}`}>
      <div className="flex ml-auto">
      <div className="mr-5 w-fit h-fit border-gray-800 border p-2 rounded-md hover:bg-green-950 hover:text-white"> Feedback</div>
        <Link href="/home">
      <div className="mr-10  w-fit h-fit border-gray-800 border p-2 rounded-md hover:bg-green-950 hover:text-white"> Homepage</div>
      </Link>
      </div>
      <div className="primary-container flex">
        <div className="w-2/3 h-full p-5">This is a tool for detecting image tampering using Digital Image Forensics techniques,
         aiming to provide both professional as well as casual users with reliable tools to verify images  </div>
         <div className="w-1/3 h-full">
          <Image src={Pattern} width={800} height={800} alt = ""    className="header-img"></Image>
         </div>
         </div>
    </div>
  );
};

export default Banner;
