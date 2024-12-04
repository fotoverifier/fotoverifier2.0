import React from "react";
import "@/styles/head/head_home.css";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import FotoverifierWhite from "@/assets/Fotoverifier_white.svg";
import IconWhite from "@/assets/icon_main_white.svg";
import HH_Button from "../button/head_home_button";
import { Poppins } from "next/font/google";
import DropdownButton from "../button/dropdown_button";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"]
});
const test = ["test1", "test2"]
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
      <div className={`header-shortcuts ${poppins.className}`}>
        {/*
        <button className="header-button"> Resources</button>
        <button className={`header-button ${poppins.className}`}>News</button>
        <button className={`header-button ${poppins.className}`}>Team</button>
      */}
      <DropdownButton title="Resource" array={test}></DropdownButton>
          <DropdownButton title="News" array={test}></DropdownButton>
              <DropdownButton title="Contact" array={test}></DropdownButton>
      </div>
      <Link className="header-go" href="/dashboard">
        <div className={`header-dashboard-button ${poppins.className}`}>
          <div>GO TO DASHBOARD</div>
        </div>
      </Link>
    </div>
  );
};

export default Home_Header;