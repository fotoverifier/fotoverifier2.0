'use client';
import styles from './wave.module.css';

const Wave = () => {
  return (
    <div className={`${styles.body} $hideScrollbar`}>
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
      </div>
    </div>
  );
};

export default Wave;
