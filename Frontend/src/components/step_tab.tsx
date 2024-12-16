import React, { useState } from 'react';
import styles from "@/components/step_tab.module.css";
import { Montserrat } from 'next/font/google';
interface TabProps {
  tabs: string[];
  renderContent: (activeTab: string) => React.ReactNode;
}
const monstserrat = Montserrat({subsets: ["latin"]});
const Tabs: React.FC<TabProps> = ({ tabs, renderContent }) => {

    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  return (
      <div className={styles.tabs_container}>
    <div className={`${styles.tabs} ${monstserrat.className} font-semibold my-5`}>
      {tabs.map((tab, index) => (
        <React.Fragment key={tab}>
          <button
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
          {index < tabs.length - 1 && <div className={styles.tab_connector}></div>}
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

