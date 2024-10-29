"use client";
import { usePathname, useRouter } from "next/navigation";
import Sidebar_Specialized, { SidebarItem } from "@/components/sidebar/sidebar_specialized";
import { FaInfoCircle, FaRegLightbulb, FaRegSun, FaTools } from "react-icons/fa";
import Logo from "@/assets/icon_main_white.svg"
import Link from "next/link";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
   const sidebarItems = [
    { path: "/specialized/information", icon: <FaInfoCircle />, text: "Information" },
    { path: "/specialized/shadow", icon: <FaRegLightbulb />, text: "Shadow" },
    { path: "/specialized/reflection", icon: <FaRegSun />, text: "Reflection" },
    { path: "/specialized/dif-methods", icon: <FaTools />, text: "DIF Methods", alert: true },
  ];

  return (
    <div className="flex w-full h-full">
      <Sidebar_Specialized logo = {Logo}>
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
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
