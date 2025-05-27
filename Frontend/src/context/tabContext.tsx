'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

type TabType =
  | 'Tampering Detection'
  | 'Superesolution'
  | 'AI_Investigators'
  | 'Originality'
  | 'Location';

interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('Tampering Detection');

  const setActiveTabSafe = (tab: string) => {
    const tabOptions: TabType[] = [
      'Tampering Detection',
      'Superesolution',
      'AI_Investigators',
      'Originality',
      'Location',
    ];

    const matchingTab = tabOptions.find((option) => t(option) === tab);

    if (matchingTab) {
      setActiveTab(matchingTab);
    } else {
      console.warn(`Invalid tab name: ${tab}`);
    }
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab: setActiveTabSafe }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabProvider');
  }
  return context;
};
