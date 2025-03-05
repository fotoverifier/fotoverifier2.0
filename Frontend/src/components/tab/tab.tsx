import React, { useState } from 'react';
import styles from '@/styles/tab/tab.module.css';
interface TabAreaProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabArea: React.FC<TabAreaProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tab_area}>
      <button
        className={`${styles.tab} ${activeTab === 'Exif Data' ? styles.active : ''}`}
        onClick={() => onTabChange('Exif Data')}
      >
        Exif Data
      </button>
      <div className={styles.vertical_line}></div>
      <button
        className={`${styles.tab} ${activeTab === 'Geo Tags' ? styles.active : ''}`}
        onClick={() => onTabChange('Geo Tags')}
      >
        Geo Tags
      </button>
    </div>
  );
};

export default TabArea;
