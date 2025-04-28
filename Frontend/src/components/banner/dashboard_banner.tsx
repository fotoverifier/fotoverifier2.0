'use client';
import React from 'react';
import Image from 'next/image';
import { Inter, Montserrat, Poppins } from 'next/font/google';
import Link from 'next/link';
import Pattern from '@/assets/Group 52.svg';
import styles from '@/styles/banner.module.css';
import { LuPaperclip } from 'react-icons/lu';
import { useLanguage } from '@/context/LanguageContext';
import FeedBackModal from '../modal/feedback_modal/feedback_modal';

const poppins = Poppins({ subsets: ['latin'], weight: '400' });

const DashBoard_Banner = () => {
  const [openModal, setIsModalOpen] = React.useState(false);
  const { t } = useLanguage();
  return (
    <div className={`${styles.banner_container} flex-col ${poppins.className}`}>
      <nav className={styles.nav}>
        <div
          className={styles.nav_link}
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
        >
          {t('feedback')}
        </div>

        {openModal && (
          <FeedBackModal closeModal={() => setIsModalOpen(false)} />
        )}
        <div className={styles.head_line}></div>
        <Link href="/home">
          <div className={styles.start_button}>{t('Go to Home')}</div>
        </Link>
      </nav>

      <div className={`${styles.primary_container} flex`}>
        <div className="w-2/3 h-full p-5 flex flex-col justify-center ">
          <p>{t('image_tampering_tool_description')}</p>
          <div className="flex gap-3">
            <div className={styles.plan_button}> {t('development_plan')}</div>
            <div className={`flex ${styles.plan_button} items-center gap-3`}>
              {' '}
              <Link href='./development'>  {t('our_paper')} </Link><LuPaperclip />
            </div>
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

export default DashBoard_Banner;
