'use client';
import React, { useEffect, useState } from 'react';
import Header_Home_Alt from '@/components/head/head_home_alt';
import AboutUs from './home/about_us/about_us';
import Technique_Landing from './home/technique/technique';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen w-full">
      <Header_Home_Alt isScrolled={isScrolled} />
      <div className="absolute top-0 left-0 w-full h-[110vh]">
        {children}
        <div id="librarySection">
          <Technique_Landing />
        </div>
        <div id="aboutUS">
          <AboutUs />
        </div>
      </div>
    </div>
  );
}
