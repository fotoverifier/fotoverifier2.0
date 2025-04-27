'use client';
import React from 'react';
import styles from '@/app/(main layout)/dashboard/dashboard.module.css';
import { Inter, Poppins } from 'next/font/google';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Card_Cate from '@/components/card/card_category';
import Image_Aessment from '@/assets/Image_Asessment.svg';
import Tutorial from '@/assets/Tutorial.svg';
import { useLanguage } from '@/context/LanguageContext';
const inter = Inter({ subsets: ['latin'] });

const montserrat = Montserrat({ subsets: ['latin'] });

const Dashboard = () => {
  const { t } = useLanguage();

  const categories = [
    {
      title: t('image_assessment_title'),
      description: t('image_assessment_description'),
      icon: (
        <Image
          src={Image_Aessment}
          alt="Image Assessment Icon"
          width={200}
          height={200}
        />
      ),
      titleIcon: 1,
      href: '/upload',
    },
  ];

  const tutorials = [
    {
      title: t('tutorial_title'),
      description: t('tutorial_description'),
      icon: <Image src={Tutorial} alt="Tutorial" width={200} height={200} />,
      titleIcon: 2,
      href: '/library',
    },
  ];

  return (
    <div className={`${styles.home_container2} ${montserrat.className}`}>
      <div className={styles.content_fcontainer}>
        <div className={styles.space}></div>
        <div className={`font-bold ${styles.fcontainer_title}`}>
          {t('Our services')}
        </div>
        <div className={styles.space}></div>
        <div className={styles.dashboard_categories}>
          {categories.map((category, index) => (
            <Card_Cate
              key={index}
              svgIcon={category.icon}
              title={category.title}
              titleIcon={category.titleIcon}
              description={category.description}
              href={category.href}
            />
          ))}
        </div>
        <div className={styles.space}></div>
        <div className={`font-bold ${styles.fcontainer_foot}`}>
          {' '}
          {t('Service_1_title')}{' '}
        </div>
      </div>
      <div className={styles.vertical_bar}></div>
      <div className={styles.content_fcontainer}>
        <div className={styles.space}></div>
        <div className={`font-bold ${styles.fcontainer_title}`}>
          {t('Tutorial')}
        </div>
        <div className={styles.space}></div>
        <div className={styles.dashboard_categories}>
          {tutorials.map((tutorial, index) => (
            <Card_Cate
              key={index}
              titleIcon={tutorial.titleIcon}
              svgIcon={tutorial.icon}
              title={tutorial.title}
              description={tutorial.description}
              href={''}
            />
          ))}
        </div>

        <div className={styles.space}></div>

        <div className={`font-bold ${styles.fcontainer_foot}`}>
          {' '}
          {t('tutorial_1_title')}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
