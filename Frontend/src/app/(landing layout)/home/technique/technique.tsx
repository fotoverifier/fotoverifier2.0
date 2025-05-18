'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './technique.module.css';
import { Be_Vietnam_Pro, Poppins } from 'next/font/google';
import { motion } from 'framer-motion';
import PlaceHolder from '@/assets/Group 12.svg';
import { useLanguage } from '@/context/LanguageContext';
const poppins = Poppins({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const featureVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: any) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: index * 0.2, ease: 'easeOut' },
  }),
};

const Technique_Landing = () => {
  const { t } = useLanguage();
  const features = [
    {
      title: t('forensic_clarity_title'),
      description: t('forensic_clarity_description'),
      imgSrc: PlaceHolder,
    },
    {
      title: t('smart_navigation_title'),
      description: t('smart_navigation_description'),
      imgSrc: PlaceHolder,
    },
    {
      title: t('forensic_hub_title'),
      description: t('forensic_hub_description'),
      imgSrc: PlaceHolder,
    },
  ];

  useEffect(() => {
    const grid = document.getElementById('grid') as HTMLElement | null;
    const container = document.querySelector(
      `.${styles.container}`
    ) as HTMLElement | null;
    if (!grid || !container) return;

    const cellSize = 60;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const columns = Math.floor(containerWidth / cellSize);
    const rows = Math.floor(containerHeight / cellSize);
    const totalCells = rows * columns;
    const cells: HTMLDivElement[] = [];
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add(styles.cell);
      grid.appendChild(cell);
      cells.push(cell);
    }

    let trail: number[] = [];

    const clearGlow = (cell: HTMLDivElement) => {
      cell.style.backgroundColor = '';
      cell.style.boxShadow = '';
    };

    const setGlow = (cell: HTMLDivElement, intensityIndex: number) => {
      const opacities = [0.3, 0.2, 0.1];
      const boxShadows = [
        '0 0 10px rgba(255, 255, 255, 0.7)',
        '0 0 7px rgba(255, 255, 255, 0.5)',
        '0 0 5px rgba(255, 255, 255, 0.3)',
      ];
      cell.style.backgroundColor = `rgba(8, 255, 255, ${opacities[intensityIndex]})`;
      cell.style.boxShadow = boxShadows[intensityIndex];
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      const index = row * columns + col;

      if (index < 0 || index >= cells.length) return;

      trail = trail.filter((idx) => idx !== index);
      trail.unshift(index);
      if (trail.length > 3) {
        const removedIndex = trail.pop();
        if (removedIndex !== undefined) {
          clearGlow(cells[removedIndex]);
        }
      }

      cells.forEach((cell) => {
        cell.style.backgroundColor = '';
        cell.style.boxShadow = '';
      });

      trail.forEach((cellIndex, i) => {
        const cell = cells[cellIndex];
        setGlow(cell, i);
      });
    };

    const mouseLeaveHandler = () => {
      cells.forEach((cell) => {
        clearGlow(cell);
      });
      trail = [];
    };

    container.addEventListener('mousemove', mouseMoveHandler);
    container.addEventListener('mouseleave', mouseLeaveHandler);

    return () => {
      container.removeEventListener('mousemove', mouseMoveHandler);
      container.removeEventListener('mouseleave', mouseLeaveHandler);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div id="grid" className={styles.grid}></div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ amount: 0.2 }}
        >
          <div className={styles.hero}>
            <h1 className={`${styles.title} ${beVietnam.className}`}>
              {t('forensic_accuracy_title')} <br />
              {t('powered_by')}
              <span className={`text-red-300 ${styles.fotoverification}`}>
                Fotoverifier V2.0
              </span>
            </h1>

            <div className={styles.badgeContainer}>
              <span className={`${styles.badge} ${styles.developer}`}>
                Professionals
              </span>
              <span className={`${styles.badge} ${styles.designer}`}>
                Enthusiasts
              </span>
            </div>
          </div>
        </motion.div>

        {}
        <motion.div
          className={styles.featureContainer}
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          viewport={{ amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.card}
              variants={featureVariants}
              custom={index}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={feature.imgSrc}
                  alt={feature.title}
                  width={250}
                  height={150}
                />
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={styles.ctaContainer}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          viewport={{ amount: 0.2 }}
        >
          <div className={styles.ctaButton}> {t('View_all_features')}</div>
        </motion.div>
      </div>
    </>
  );
};

export default Technique_Landing;
