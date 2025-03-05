'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import '@/styles/stylesidebar.css';
import iconSrc from '@/assets/icon.svg';
import iconSrc2 from '@/assets/icon_main_white.svg';
import SideBarItem from '@/components/menuoption';
import { GoHome } from 'react-icons/go';
import { useRouter, usePathname } from 'next/navigation';
import { PiShieldCheckeredFill } from 'react-icons/pi';
import { FaChevronLeft, FaGithub } from 'react-icons/fa';
import { SiLibrariesdotio } from 'react-icons/si';
import { CiImageOff } from 'react-icons/ci';
import { Inter, Montserrat } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });
const items = [
  { text: 'Dashboard', icon: <GoHome />, href: '/dashboard' },
  { text: 'Upload', icon: <CiImageOff />, href: '/upload' },
  { text: 'Libraries', icon: <SiLibrariesdotio />, href: '/library' },
  { text: 'Privacy', icon: <PiShieldCheckeredFill />, href: '/privacy' },
  { text: 'GitHub', icon: <FaGithub />, href: '/github' },
];
const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className={`sidebar shrink ${inter.className}`}>
      <Link href="/home">
        <Image
          src={iconSrc}
          width={500}
          height={500}
          alt=""
          className="my-2"
        ></Image>
      </Link>
      <div className="w-full bg-gray-800 h-0.5"> </div>
      <div className="menu">
        {items.map((item, index) => (
          <SideBarItem
            key={index}
            text={item.text}
            icon={item.icon}
            active={pathname === item.href}
            href={item.href}
            caption={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
