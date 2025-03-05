'use client';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar_Specialized, {
  SidebarItem,
} from '@/components/sidebar/sidebar_specialized';
import {
  FaChevronRight,
  FaInfoCircle,
  FaRegLightbulb,
  FaRegSun,
  FaTools,
} from 'react-icons/fa';
import Link from 'next/link';
import styles from '@/app/(specialized layout)/specialized.module.css';
import { SiJpeg } from 'react-icons/si';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const sidebarItems = [
    {
      path: '/specialized/dif-methods/Jpeg-ghost',
      icon: <SiJpeg />,
      text: 'Jpeg ghost',
    },
    {
      path: '/specialized/dif-methods/DLA',
      icon: <FaChevronRight />,
      text: 'DLA',
    },
    {
      path: '/specialized/dif-methods/Noise-print',
      icon: <FaChevronRight />,
      text: 'Noise print',
    },
    {
      path: '/specialized/Jpeg_mis-alignment',
      icon: <FaChevronRight />,
      text: 'Jpeg mis-alignment',
    },
  ];

  return (
    <div className="flex h-full w-full">
      <Sidebar_Specialized title="Method">
        {sidebarItems.map((item) => (
          <Link href={item.path} key={item.text}>
            <SidebarItem
              icon={item.icon}
              text={item.text}
              active={pathname === item.path}
            />
          </Link>
        ))}
      </Sidebar_Specialized>
      <div className="w-full h-full">{children} </div>
    </div>
  );
}
