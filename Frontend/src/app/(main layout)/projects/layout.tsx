// app/layout.tsx
import LayoutTabs from '@/components/tab/project_tab';
import React from 'react';

export const metadata = {
  title: 'My App',
  description: 'Microfinance Lending Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <LayoutTabs>          {children}
        </LayoutTabs>
  );
}
