'use client';

import React from 'react';
import styles from '@/components/tab/step_tab.module.css';
import { Montserrat } from 'next/font/google';

interface TabProps {
  renderContent: (activeTab: string) => React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;

}

const montserrat = Montserrat({ subsets: ['latin'] });

const tabs = ['Tampering_Detection', 'Originality', 'Location', 'Forensic'];

const Tabs: React.FC<TabProps> = ({ renderContent, activeTab, setActiveTab }) => {

  return (
    <div className={styles.tabs_container}>
      <div
        className={`${styles.tabs} ${montserrat.className} font-semibold my-5`}
      >
        {tabs.map((tab, index) => (
          <React.Fragment key={tab}>
            <div
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
            {index < tabs.length - 1 && (
              <div className={styles.tab_connector}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className={`${styles.tab_content} ${styles.stripe_1}`}>
        {renderContent(activeTab)}
      </div>
    </div>
  );
};

export default Tabs;
