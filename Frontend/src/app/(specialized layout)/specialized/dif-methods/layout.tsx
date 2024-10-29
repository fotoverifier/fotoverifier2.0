"use client";
import { usePathname, useRouter } from "next/navigation";
import Sidebar_Specialized, { SidebarItem } from "@/components/sidebar/sidebar_specialized";
import { FaChevronRight, FaInfoCircle, FaRegLightbulb, FaRegSun, FaTools } from "react-icons/fa";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
   const sidebarItems = [
    { path: "/specialized/dif-methods/Jpeg-ghost", icon: <FaChevronRight />, text: "Jpeg ghost" },
    { path: "/specialized/DLA", icon: <FaChevronRight />, text: "DLA" },
    { path: "/specialized/CLA", icon: <FaChevronRight />, text: "CLA" },
    { path: "/specialized/Jpeg_mis-alignment", icon: <FaChevronRight />, text: "Jpeg mis-alignment", alert: false },
  ];

  return (
    <div className="flex">
      <Sidebar_Specialized title="Method">
        {sidebarItems.map((item) => (
          <Link href={item.path} key={item.text}>
            <SidebarItem
              icon={item.icon}
              text={item.text}
              active={pathname === item.path}
              alert={item.alert || false}
            />
          </Link>
        ))}
      </Sidebar_Specialized>
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
