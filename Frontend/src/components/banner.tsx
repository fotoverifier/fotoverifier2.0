import React from "react";
import "@/styles/banner.css";
import Image from "next/image";
import { Inter, Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"] });
import iconSrc from "@/assets/icon_main_white.svg";
const Banner = () => {
  return (
    <div className="banner-container">
      <div className="primary-container">This is a tool for detecting image tampering using Digital Image Forensics techniques, aiming to provide both professional as well as casual users with reliable tools to verify images  </div>
    </div>
  );
};

export default Banner;
