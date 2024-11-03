import React, { useState } from 'react';
import styles from  '@/styles/tab/tab.module.css';
interface TabAreaProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabArea: React.FC<TabAreaProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles.tab_area}>
      <button
        className={`${styles.tab} ${activeTab === 'General' ? styles.active : ''}`}
        onClick={() => onTabChange('General')}
      >
        General Result
      </button>
      <div className={styles.vertical_line}></div>
      <button
        className={`${styles.tab} ${activeTab === 'Reversed' ? styles.active : ''}`}
        onClick={() => onTabChange('Reversed')}
      >
        Reversed Image
      </button>
    </div>
  );
};

export default TabArea;