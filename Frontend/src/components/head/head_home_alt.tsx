"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/head/head_home_alt.module.css"; // Import module CSS
import FotoverifierWhite from "@/assets/Fotoverifier_white.svg";
import IconWhite from "@/assets/icon_main_white.svg";

const languages = [
  { code: "EN", name: "English", flag: "https://flagcdn.com/w40/gb.png" }, // UK flag
  { code: "VN", name: "Tiếng Việt", flag: "https://flagcdn.com/w40/vn.png" }, // Vietnam flag
  { code: "DK", name: "Dansk", flag: "https://flagcdn.com/w40/dk.png" }, // Denmark flag
];

const Header_Home_Alt = ({ isScrolled }: { isScrolled: boolean }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]); // Default: English
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
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
      {/* Left - Icons */}
      <div className={styles.header_icon}>
        <div className={styles.image_wrapper}>
          <Image src={IconWhite} alt="Image 1" objectFit="cover" />
        </div>
        <div className={styles.image_wrapper}>
          <Image src={FotoverifierWhite} alt="Image 2" objectFit="cover" />
        </div>
      </div>

      {/* Right - Navigation */}
      <nav className={styles.nav}>
        {/* 🌍 Language Dropdown */}
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

        {/* Navigation Links */}
        <Link href="#" className={styles.nav_link}>
          Feedback
        </Link>
        <div className={styles.head_line}></div>
        <button className={styles.start_button}>Go to dashboard</button>
      </nav>
    </header>
  );
};

export default Header_Home_Alt;
