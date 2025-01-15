'use client';
import React from "react";
import "@/styles/banner.css";
import Image from "next/image";
import { Inter, Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"] });
import Pattern from "@/assets/Group 52.svg";
import FeedBackModal from "./modal/feedback_modal/feedback_modal";
const Banner = () => {
    const [openModal, setModalOpen] = React.useState(false);
  return (
    <div className={`banner-container flex-col ${poppins.className}`}>
      <div className="flex ml-auto">
      <div className="mr-5 w-fit h-fit border-gray-800 border p-2 rounded-md hover:bg-green-950 hover:text-white cursor-pointer" onClick={() => setModalOpen(true)}> Feedback</div>
       {openModal && (
               <FeedBackModal closeModal={() => setModalOpen(false)} />
      )}
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
