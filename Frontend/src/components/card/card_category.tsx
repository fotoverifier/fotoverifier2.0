import React, { ReactNode } from 'react';
import styles from './card_category.module.css'; 
import {

} from 'react-icons/io';
import Link from 'next/link';

interface CardProps {
  svgIcon: ReactNode; 
  title: string; 
  description: string;
  titleIcon: ReactNode;
  href?: string; 
}

const Card_Cate: React.FC<CardProps> = ({
  svgIcon,
  title,
  description,
  titleIcon,
  href, 
}) => {
  return (
    <div className={styles.card}>
      {}
      {svgIcon}

      <div className={styles.card__content}>
        <div className={styles.title_wrapper}>
          <div className={styles.title_icon}>{titleIcon}</div>
          <p className={styles.card__title}>{title}</p>
        </div>

        {}
        <div className={styles.divider}></div>

        <p className={styles.card__description}>{description}</p>

        {}
         {href && (
          <Link href={href} className={styles.start_button}>
            Start Now →
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card_Cate;
