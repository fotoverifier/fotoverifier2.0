"use client";
import React from "react";
import styles from "@/styles/head/head_home.module.css"; // Importing CSS file
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import FotoverifierWhite from "@/assets/Fotoverifier_white.svg";
import IconWhite from "@/assets/icon_main_white.svg";
import HH_Button from "../button/head_home_button";
import { Poppins } from "next/font/google";
import DropdownButton from "../button/dropdown_button";
import FeedBackModal from "../modal/feedback_modal/feedback_modal";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

const test = ["test1", "test2"];

const Home_Header = () => {
  const [openModal, setModalOpen] = React.useState(false);

  return (
    <div className={styles.header_container}>
      <div className={styles.header_icon}>
        <div className={styles.image_wrapper}>
          <Image src={IconWhite} alt="Image 1" objectFit="cover" />
        </div>
        <div className={styles.image_wrapper}>
          <Image src={FotoverifierWhite} alt="Image 2" objectFit="cover" />
        </div>
      </div>
      <div className={styles.vertical_line_header}></div>
      <div className={`${styles.header_shortcuts} ${poppins.className}`}>
        <DropdownButton title="Resource" array={test}></DropdownButton>
        <DropdownButton title="News" array={test}></DropdownButton>
        <DropdownButton title="Contact" array={test}></DropdownButton>
      </div>

      <div
        className={`h-fit w-fit p-5 cursor-pointer ${poppins.className}`}
        onClick={() => setModalOpen(true)}
      >
        Feedback
      </div>

      {openModal && <FeedBackModal closeModal={() => setModalOpen(false)} />}

      <Link className={styles.header_go} href="/dashboard">
        <div className={`${styles.header_dashboard_button} ${poppins.className}`}>
          <div>GO TO DASHBOARD</div>
        </div>
      </Link>
    </div>
  );
};

export default Home_Header;
