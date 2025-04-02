'use client';
import { usePathname } from 'next/navigation';
import Sidebar_Alt from '@/components/sidebar/sidebar_alt';
import DashBoard_Banner from '@/components/banner/dashboard_banner';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <div className="w-screen h-screen flex">
      <Sidebar_Alt />
      <div className="w-full">
        {pathname !== '/privacy' && !pathname.startsWith('/library') && (
          <DashBoard_Banner />
        )}
        {children}
      </div>
    </div>
  );
}
