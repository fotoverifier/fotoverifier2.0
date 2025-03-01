"use client";
import React, { useEffect, useState } from "react";
import Header_Home_Alt from "@/components/head/head_home_alt";
import LibraryPage from "./home/technique";
import AboutUs from "./home/about_us";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // If scrolled down 50px, update state
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-screen w-full">
      <Header_Home_Alt isScrolled={isScrolled} />
      <div className="absolute top-0 left-0 w-full h-[110vh]">
        {children}
        {/* ✅ Library Section */}
        <div id="librarySection">
          <LibraryPage />
        </div>
        <div id="aboutUS">
          <AboutUs />
        </div>
      </div>
    </div>
  );
}
