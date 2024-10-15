"use client";
import React, { useState } from "react";
import Image from "next/image";

import "@/styles/stylesidebar.css";
import iconSrc from "@/assets/icon.svg"; // Adjust path based on your project structure
import iconSrc2 from "@/assets/icon_main.svg";
import SideBarItem from "@/components/menuoption";
import { GoHome } from "react-icons/go";
import { useRouter, usePathname } from "next/navigation";
import { PiShieldCheckeredFill } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";
import { SiLibrariesdotio } from "react-icons/si";
import { CiImageOff } from "react-icons/ci";

const items = [
  { text: "Dashboard", icon: <GoHome />, href: "/dashboard" },
  { text: "Upload", icon: <CiImageOff />, href: "/upload" },
  { text: "Libraries", icon: <SiLibrariesdotio />, href: "/libraries" },
  { text: "Privacy", icon: <PiShieldCheckeredFill />, href: "/privacy" },
  { text: "GitHub", icon: <FaGithub />, href: "/github" },

];
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isShrunk, setIsShrunk] = useState(false);

  const handleShrink = () => {
    setIsShrunk(!isShrunk);
  };
  return (
    <div className={`sidebar ${isShrunk ? "shrink" : ""}`}>
      <div className="icon">
        <Image
          src={iconSrc2}
          alt="Fotoverfier"
          width={200}
          height={200}
          className="icon-img"
          onClick={handleShrink}
        />
        <Image
          src={iconSrc}
          alt="Icon2"
          width={400}
          height={400}
          className="icon-img icon2"
        />
      </div>
      <div className="menu">
        {items.map((item, index) => (
          <SideBarItem
            key={index}
            text={item.text}
            icon={item.icon}
            active={pathname === item.href}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
