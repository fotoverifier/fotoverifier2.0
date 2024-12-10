import React, { useState } from 'react';
import '@/components/step_tab.css';
import { Montserrat } from 'next/font/google';
interface TabProps {
  tabs: string[];
  renderContent: (activeTab: string) => React.ReactNode;
}
const monstserrat = Montserrat({subsets: ["latin"]});
const Tabs: React.FC<TabProps> = ({ tabs, renderContent }) => {

    const [activeTab, setActiveTab] = useState<string>(tabs[0]);
  return (
    <div className="tabs-container">
      <div className={`tabs ${monstserrat.className} font-semibold`}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab}>
            <button
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
            {index < tabs.length - 1 && <div className="tab-connector"></div>}
          </React.Fragment>
        ))}
      </div>
      <div className="tab-content stripe-1">
        {renderContent(activeTab)}
      </div>
    </div>
  );
};

export default Tabs;

