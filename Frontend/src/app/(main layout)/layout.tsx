'use client';
import Sidebar from "@/components/sidebar";
import Banner from "@/components/banner";
import { usePathname } from 'next/navigation';
import Sidebar_Alt from "@/components/sidebar_alt";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route path
  return (
    <div className="w-screen h-screen flex">
      <Sidebar_Alt />
      <div className="w-full">
          {pathname !== "/privacy" && !pathname.startsWith("/library") && <Banner />}
        {children}
      </div>
    </div>
  );
}
