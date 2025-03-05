"use client"; 

import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import styles from "@/components/step_tab.module.css";
import { Montserrat } from "next/font/google";

interface TabProps {
  tabs: string[];
  renderContent: (activeTab: string) => React.ReactNode;
}

const montserrat = Montserrat({ subsets: ["latin"] });

const Tabs: React.FC<TabProps> = ({ tabs, renderContent }) => {
  const searchParams = useSearchParams();
const pathname = usePathname();
const router = useRouter();

const tabParam = searchParams.get("tab");
const imageParam = searchParams.get("image");

const [activeTab, setActiveTab] = useState<string>(
  tabParam && tabs.includes(tabParam) ? tabParam : tabs[0]
);

useEffect(() => {
  if (tabParam && tabs.includes(tabParam)) {
    setActiveTab(tabParam);
  }
}, [tabParam, tabs]);

const handleTabChange = (selectedTab: string) => {
  setActiveTab(selectedTab);

  const newUrl = `${pathname}?tab=${selectedTab}${imageParam ? `&image=${imageParam}` : ''}`;
  router.replace(newUrl);
};

  return (
    <div className={styles.tabs_container}>
      <div className={`${styles.tabs} ${montserrat.className} font-semibold my-5`}>
        {tabs.map((tab, index) => (
          <React.Fragment key={tab}>
            <div
              className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </div>
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
