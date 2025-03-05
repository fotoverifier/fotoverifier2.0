import React from 'react';
import styles from './card.module.css';
import { IconType } from 'react-icons';

interface CardProps {
  icon: IconType;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon: Icon, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Icon />
        <p className={styles.para}>{description}</p>
      </div>
    </div>
  );
};

export default Card;
