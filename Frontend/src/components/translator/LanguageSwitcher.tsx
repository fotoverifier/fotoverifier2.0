'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import styles from './LanguageSwitcher.module.css';
import '@/context/LanguageContext';
import type { Locale } from '@/context/LanguageContext';

const languages = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'vi', name: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png' },
  { code: 'no', name: 'Norsk', flag: 'https://flagcdn.com/w40/no.png' },
];

const LanguageSwitcher = () => {
  const { setLocale, locale } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.code === locale) || languages[0]
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const matchedLang = languages.find((lang) => lang.code === locale);
    if (matchedLang) {
      setSelectedLanguage(matchedLang);
    }
  }, [locale]);

  return (
    <div className={styles.lang_dropdown} ref={dropdownRef}>
      <button className={styles.lang_toggle} onClick={toggleDropdown}>
        <Image
          src={selectedLanguage.flag}
          alt={selectedLanguage.code}
          width={24}
          height={24}
          className={styles.flag_icon}
        />
        {selectedLanguage.name}
      </button>
      {dropdownOpen && (
        <ul className={styles.dropdown_menu}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={styles.dropdown_item}
              onClick={() => {
                setSelectedLanguage(lang);
                setLocale(lang.code as Locale);
                setDropdownOpen(false);
              }}
            >
              <Image
                src={lang.flag}
                width={24}
                height={24}
                alt={lang.code}
                className={styles.flag_icon}
              />
              {lang.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
