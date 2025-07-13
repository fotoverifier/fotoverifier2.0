'use client';

import React from 'react';
import styles from '@/components/tab/step_tab.module.css';
import { Inter, Merriweather, Montserrat } from 'next/font/google';
import { useTabContext } from '@/context/tabContext';
import { useLanguage } from '@/context/LanguageContext';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const merriweather = Merriweather({ subsets: ['latin'], weight: '700' });

interface TabProps {
  renderContent: (activeTab: string) => React.ReactNode;
}

const Tabs: React.FC<TabProps> = ({ renderContent }) => {
  const { t } = useLanguage();
  const { activeTab, setActiveTab } = useTabContext();
  const tabs = [
    t('Tampering Detection'),
    t('Superesolution'),
    t('Originality'),
    t('Location'),
    t('AI_Investigators'),
  ];

  return (
    <div className={styles.tabs_container}>
      <div className={`${styles.tabs} ${montserrat.className} font-semibold my-5`}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab}>
            <div
              className={`${styles.tab} ${t(activeTab) === tab ? styles.active : ''}`}
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
      <div
        className={`${styles.tab_content} ${styles.stripe_1} ${montserrat.className}`}
      >
        {renderContent(activeTab)}
      </div>
    </div>
  );
};

export default Tabs;
