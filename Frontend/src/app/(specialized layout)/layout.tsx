'use client';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar_Specialized, {
  SidebarItem,
} from '@/components/sidebar/sidebar_specialized';
import {
  FaInfoCircle,
  FaRegLightbulb,
  FaRegSun,
  FaTools,
} from 'react-icons/fa';
import Logo from '@/assets/icon_main_white.svg';
import Link from 'next/link';
import styles from '@/app/(specialized layout)/specialized.module.css';
import Image from 'next/image';
import { Montserrat, Inter } from 'next/font/google';
import { useState } from 'react';
import { TbZoomInArea } from 'react-icons/tb';
import { IoMedicalSharp } from 'react-icons/io5';
import { CiLight } from 'react-icons/ci';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const sidebarItems = [
    {
      path: '/specialized/information',
      icon: <FaInfoCircle />,
      text: 'Information',
    },
    {
      path: '/specialized/image_ss',
      icon: <TbZoomInArea />,
      text: 'Image Upscale',
    },
    {
      path: '/specialized/magnifier',
      icon: <IoMedicalSharp />,
      text: 'Magnifier',
    },
    { path: '/specialized/reflection', icon: <CiLight />, text: 'Reflection' },
    {
      path: '/specialized/dif-methods',
      icon: <FaTools />,
      text: 'DIF Methods',
      alert: true,
    },
  ];

  return (
    <div className="flex w-full h-full">
      <Sidebar_Specialized logo={Logo}>
        {sidebarItems.map((item) => (
          <Link href={item.path} key={item.text}>
            <SidebarItem
              icon={item.icon}
              text={item.text}
              active={pathname.startsWith(item.path)}
              alert={item.alert || false}
            />
          </Link>
        ))}
      </Sidebar_Specialized>
      <div className="w-full h-full">
        <div className={`${styles.height_94}`}> {children}</div>
      </div>
    </div>
  );
}
