'use client';
import { useRouter, usePathname } from 'next/navigation';
import { IoLibrary } from 'react-icons/io5';
import { MdPolicy } from 'react-icons/md';
import {
  FaUpload,
  FaHome,
  FaGithub,
  FaMoon,
  FaSun,
  FaGlobe,
} from 'react-icons/fa';
import IconMain from '@/assets/icon_main.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './sidebar_alt.module.css';

const categories = [
  { name: 'Home', slug: '/dashboard', icon: <FaHome size={20} /> },
  { name: 'Upload', slug: '/upload', icon: <FaUpload size={20} /> },
  { name: 'Library', slug: '/library', icon: <IoLibrary size={20} /> },
  { name: 'Policy', slug: '/privacy', icon: <MdPolicy size={20} /> },
  { name: 'GitHub', slug: 'https://github.com', icon: <FaGithub size={20} /> },
];

const languages = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'vi', name: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png' },
  { code: 'no', name: 'Norsk', flag: 'https://flagcdn.com/w40/no.png' },
  { code: 'jp', name: '日本語', flag: 'https://flagcdn.com/w40/jp.png' },
];

export default function Sidebar_Alt() {
  const { t } = useLanguage();

  const categories = [
    { name: t('Home'), slug: '/dashboard', icon: <FaHome size={20} /> },
    { name: t('Upload'), slug: '/upload', icon: <FaUpload size={20} /> },
    { name: t('Library'), slug: '/library', icon: <IoLibrary size={20} /> },
    { name: t('Policy'), slug: '/privacy', icon: <MdPolicy size={20} /> },
    {
      name: 'GitHub',
      slug: 'https://github.com',
      icon: <FaGithub size={20} />,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  const { setLocale, locale } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.code === locale) || languages[0]
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const matchedLang = languages.find((lang) => lang.code === locale);
    if (matchedLang) {
      setSelectedLanguage(matchedLang);
    }
  }, [locale]);

  const handleLanguageChange = (lang: any) => {
    setLocale(lang.code);
    setIsOpen(false);
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <Image src={IconMain} width={50} height={50} alt="" />
        </div>
      </div>

      <div className={styles.divider}></div>

      <ul className={styles.navList}>
        {categories.map((category) => {
          const isActive = pathname === category.slug;
          return (
            <div key={category.slug} className={styles.navItem}>
              <div
                onClick={() =>
                  category.slug.startsWith('http')
                    ? window.open(category.slug, '_blank')
                    : router.push(category.slug)
                }
                className={`${styles.navLink} ${
                  isActive ? styles.navLinkActive : styles.navLinkInactive
                }`}
              >
                <div className={styles.navIconContainer}>{category.icon}</div>
                <span className={styles.navTooltip}>{category.name}</span>
              </div>
            </div>
          );
        })}
      </ul>

      <div className={styles.footerContainer}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={styles.themeToggle}
        >
          {darkMode ? (
            <FaSun size={20} className={styles.sunIcon} />
          ) : (
            <FaMoon size={20} className={styles.moonIcon} />
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.languageButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span className={styles.languageCode}>
            {selectedLanguage.code.toUpperCase()}
          </span>
        </button>

        {isOpen && (
          <div className={styles.languageDropdown}>
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`${styles.languageOption} ${
                  selectedLanguage.code === lang.code
                    ? styles.languageOptionActive
                    : ''
                }`}
              >
                <img
                  src={lang.flag}
                  alt={lang.code}
                  className={styles.languageFlag}
                />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
