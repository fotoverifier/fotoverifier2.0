'use client';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import styles from './aboutus.module.css';
import {
  FaChevronRight,
  FaFacebook,
  FaGithub,
  FaShieldAlt,
} from 'react-icons/fa';
import Wave from '@/animation/wave';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Shield from '@/assets/insurance.png';
const AboutUs = () => {
  const { t } = useLanguage();
  const text = t('About Us');
  const typingSpeed = 200;

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setDisplayedText('');
      setIndex(0);
    }
  }, [isInView]);

  useEffect(() => {
    if (index < text.length && isInView) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [index, text, isInView]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorBlink);
  }, []);

  return (
    <div className={styles.aboutUsContainer}>
      <div className={styles.textContainer}>
        <div className="w-2/3 p-10">
          <motion.h2
            ref={ref}
            className={styles.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ amount: 0.5 }}
          >
            <FaChevronRight /> {displayedText}
            {showCursor && <span className={styles.cursor}>|</span>}
          </motion.h2>

          <div className={styles.description}>{t('About Us Description')}</div>
        </div>
        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.triangle} ${styles.left}`}
          >
            <FaFacebook size={60} color="white" />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.triangle} ${styles.right}`}
          >
            <FaGithub size={60} color="white" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
