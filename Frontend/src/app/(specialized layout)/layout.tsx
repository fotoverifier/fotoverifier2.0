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

const monstserrat = Montserrat({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });
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
      icon: <FaRegLightbulb />,
      text: 'Image enhancement',
    },
    { path: '/specialized/reflection', icon: <FaRegSun />, text: 'Reflection' },
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
        <div className={`border-t flex ${styles.height_6} text-gray `}>
          <div
            className={`flex justify-center items-center transition-all w-full h-full`}
          >
            <div className="leading-4">
              <h4 className={`${monstserrat.className}`}>
                A product of{' '}
                <span className="font-bold">HCMUS Computer Security Group</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
