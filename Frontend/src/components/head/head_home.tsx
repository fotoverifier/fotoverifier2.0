import React from "react";
import "@/styles/head/head_home.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import FotoverifierWhite from "@/assets/Fotoverifier_white.svg";
import IconWhite from "@/assets/icon_main_white.svg";
import HH_Button from "../button/head_home_button";

const inter = Inter({ subsets: ["latin"] });

const Home_Header = () => {
  return (
    <div className="header-container">
      <div className="header-icon">
        <div className="image-wrapper">
          <Image src={IconWhite} alt="Image 1" objectFit="cover" />
        </div>
        <div className="image-wrapper">
          <Image src={FotoverifierWhite} alt="Image 2" objectFit="cover" />
        </div>
      </div>
      <div className="vertical-line-header"></div>
      <div className="header-shortcuts">
        <HH_Button />
        <button className={`header-button ${inter.className}`}>News</button>
        <button className="header-button">Team</button>
      </div>
      <Link className="header-go" href="/dashboard">
        <div className="header-dashboard-button">
          <div>GO TO DASHBOARD</div>
        </div>
      </Link>
    </div>
  );
};

export default Home_Header;