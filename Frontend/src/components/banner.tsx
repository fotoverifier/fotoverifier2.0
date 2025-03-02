"use client";
import React from "react";
import Image from "next/image";
import { Inter, Montserrat, Poppins } from "next/font/google";
import Link from "next/link";
import Pattern from "@/assets/Group 52.svg"; // Updated naming format
import FeedBackModal from "./modal/feedback_modal/feedback_modal";
import styles from "@/styles/banner.module.css"; // Importing styles
import { LuPaperclip } from "react-icons/lu";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"] });

const Banner = () => {
  const [openModal, setModalOpen] = React.useState(false);

  return (
    <div className={`${styles.banner_container} flex-col ${poppins.className}`}>
      <nav className={styles.nav}>
        {/* Navigation Links */}
        <Link href="#" className={styles.nav_link}>
          Feedback
        </Link>
        <div className={styles.head_line}></div>
        <Link href="/home">
          <div className={styles.start_button}>Go to Home</div>
        </Link>
      </nav>

      <div className={`${styles.primary_container} flex`}>
        <div className="w-2/3 h-full p-5 flex flex-col justify-center ">
          <p>
            This is a tool for detecting image tampering using Digital Image
            Forensics techniques, aiming to provide both professional as well as
            casual users with reliable tools to verify images.
          </p>
          <div className="flex gap-3">
          <div className={styles.plan_button}>Our Development Plan</div>
          <div className={`flex ${styles.plan_button} items-center gap-3`}> <LuPaperclip /> Our Paper</div>
           </div>
        </div>

        <div className="w-1/3 h-full">
          <Image
            src={Pattern}
            width={800}
            height={800}
            alt="Pattern"
            className={styles.header_img}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
