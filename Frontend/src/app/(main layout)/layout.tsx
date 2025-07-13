'use client';
import { usePathname } from 'next/navigation';
import Sidebar_Alt from '@/components/sidebar/sidebar_alt';
import DashBoard_Banner from '@/components/banner/dashboard_banner';
import { ToastContainer } from 'react-toastify';
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
        {!pathname.startsWith('/project') &&
          !pathname.startsWith('/library') &&
          !pathname.startsWith('/guidance') && <DashBoard_Banner />}
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeButton
          rtl={false}
        />
      </div>
    </div>
  );
}
