"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/head/head_home_alt.module.css"; // Import module CSS
import FotoverifierWhite from "@/assets/Fotoverifier_white.svg";
import IconWhite from "@/assets/icon_main_white.svg";
import FeedBackModal from "../modal/feedback_modal/feedback_modal";

const languages = [
  { code: "EN", name: "English", flag: "https://flagcdn.com/w40/gb.png" }, // UK flag
  { code: "VN", name: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" }, // Vietnam flag
  { code: "DK", name: "Dansk", flag: "https://flagcdn.com/w40/dk.png" }, // Denmark flag
];

const Header_Home_Alt = ({ isScrolled }: { isScrolled: boolean }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Default: English
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
   <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.header_icon}>
        <div className={styles.image_wrapper}>
          <Image src={IconWhite} alt="Image 1" objectFit="cover" />
        </div>
        <div className={styles.image_wrapper}>
          <Image src={FotoverifierWhite} alt="Image 2" objectFit="cover" />
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.lang_dropdown} ref={dropdownRef}>
          <button className={styles.lang_toggle} onClick={toggleDropdown}>
            <Image
              src={selectedLanguage.flag}
              alt={selectedLanguage.code}
              width={24}
              height={24}
              className={styles.flag_icon}
            />
            {selectedLanguage.code}
          </button>
          {dropdownOpen && (
            <ul className={styles.dropdown_menu}>
              {languages.map((lang) => (
                <li
                  key={lang.code}
                  className={styles.dropdown_item}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    setDropdownOpen(false);
                  }}
                >
                  <Image src={lang.flag} width={24} height={24} alt={lang.code} className={styles.flag_icon} />
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>

         <button
        className={styles.nav_link}
        onClick={(e) => {
          e.preventDefault(); // Prevent default link behavior
          setIsModalOpen(true);
        }}
      >
        Feedback
      </button>

      {/* Render Modal when open */}
      {isModalOpen && (
        <FeedBackModal closeModal={() => setIsModalOpen(false)} />
      )}
        <div className={styles.head_line}></div>
        <Link href="/dashboard">
        <div className={styles.start_button}>Go to dashboard</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header_Home_Alt;
