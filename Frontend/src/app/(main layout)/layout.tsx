'use client';
import Sidebar from "@/components/sidebar";
import Banner from "@/components/banner";
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Get the current route path
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="w-full">
        {pathname !== "/libraries" && pathname !== "/privacy" && !pathname.startsWith("/library") && <Banner />}
        {children}
      </div>
    </div>
  );
}
