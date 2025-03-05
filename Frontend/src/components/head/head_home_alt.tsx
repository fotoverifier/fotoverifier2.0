'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/head/head_home_alt.module.css';
import FotoverifierWhite from '@/assets/Fotoverifier_white.svg';
import IconWhite from '@/assets/icon_main_white.svg';
import FeedBackModal from '../modal/feedback_modal/feedback_modal';
import LanguageSwitcher from '../translator/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

const Header_Home_Alt = ({ isScrolled }: { isScrolled: boolean }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.header_icon}>
        <div className={styles.image_wrapper}>
          <Image src={IconWhite} alt="Image 1" objectFit="cover" />
        </div>
        <div className={styles.image_wrapper}>
          <Image src={FotoverifierWhite} alt="Image 2" objectFit="cover" />
        </div>
      </div>

      <nav className={styles.nav}>
        <LanguageSwitcher></LanguageSwitcher>

        <button
          className={styles.nav_link}
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          {t('feedback')}
        </button>

        {isModalOpen && (
          <FeedBackModal closeModal={() => setIsModalOpen(false)} />
        )}
        <div className={styles.head_line}></div>
        <Link href="/dashboard">
          <div className={styles.start_button}>{t('go_to_dashboard')}</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header_Home_Alt;
