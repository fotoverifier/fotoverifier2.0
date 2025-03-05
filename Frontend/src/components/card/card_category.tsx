import React, { ReactNode } from 'react';
import styles from './card_category.module.css'; // Importing CSS module
import {
  IoIosArrowForward,
  IoIosInformationCircleOutline,
} from 'react-icons/io';

// 📌 Define props interface
interface CardProps {
  svgIcon: ReactNode; // Main image or SVG
  title: string; // Card title
  description: string; // Card description
  titleIcon: ReactNode; // Icon next to title
}

const Card_Cate: React.FC<CardProps> = ({
  svgIcon,
  title,
  description,
  titleIcon,
}) => {
  return (
    <div className={styles.card}>
      {/* Render Main Icon */}
      {svgIcon}

      <div className={styles.card__content}>
        <div className={styles.title_wrapper}>
          <div className={styles.title_icon}>{titleIcon}</div>
          <p className={styles.card__title}>{title}</p>
        </div>

        {/* 🔹 Divider Line */}
        <div className={styles.divider}></div>

        <p className={styles.card__description}>{description}</p>

        {/* 🚀 Start Button Below the Description */}
        <div className={styles.start_button}>Start Now →</div>
      </div>
    </div>
  );
};

export default Card_Cate;
