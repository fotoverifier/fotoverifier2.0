'use client';
import React, { useState } from 'react';
import styles from '@/app/(main layout)/dashboard/dashboard.module.css';
import { Inter, Poppins } from 'next/font/google';
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import Card_Cate from '@/components/card/card_category';
import Image_Aessment from '@/assets/Image_Asessment.svg';
import Tutorial from '@/assets/Tutorial.svg';
import { useLanguage } from '@/context/LanguageContext';
import { AnimatePresence, motion } from 'motion/react';
import VideoAssessment from '@/assets/video_assessment.svg';
const inter = Inter({ subsets: ['latin'] });

const montserrat = Montserrat({ subsets: ['latin'] });

const Dashboard = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex_Tutorial, setCurrentIndex_Tutorial] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };
  const handleDotClick_Tutorial = (index: number) => {
    setCurrentIndex_Tutorial(index);
  };

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
    {
      title: t('title_video_assessment'),
      description:
       t('des_video_assessment'),
      icon: (
        <Image
          src={VideoAssessment.src}
          alt="Image Assessment Icon"
          width={200}
          height={200}
        />
      ),
      titleIcon: 2,
      href: '',
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
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex justify-center items-center"
            >
              <Card_Cate
                svgIcon={categories[currentIndex].icon}
                title={categories[currentIndex].title}
                titleIcon={categories[currentIndex].titleIcon}
                description={categories[currentIndex].description}
                href={categories[currentIndex].href}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-teal-600 w-5' : 'bg-gray-300'
              }`}
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
        <div className="flex justify-center mt-4 gap-2">
          {tutorials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick_Tutorial(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                currentIndex_Tutorial === index
                  ? 'bg-teal-600 w-5'
                  : 'bg-gray-300'
              }`}
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
