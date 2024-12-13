import React from 'react'
import Link from 'next/link';
import { Inter } from 'next/font/google';
import "@/styles/stylesidebar.css"
const inter = Inter({ subsets: ["latin"] });
// Define the type for props
interface SideBarItemProps {
    text: string;       
    icon: React.ReactNode;  
    active?: boolean;   
    href: string;  
  }


const SideBarItem: React.FC<SideBarItemProps> = ({ text, icon, active, href }) => {
  return (
    <Link href={href} passHref>
    <div className={`sidebar-item ${active ? 'active' : 'inactive'} ${inter.className} mt-2`}>
      {icon && (
        <div className={`box-icon ${active ? 'active' : ''} p-2`}>
       <div className='icon-item'>
       {icon}
     </div>
     </div>
      )}
      <div className="text font-semibold">{text}</div>
    </div>
    </Link>
  );
}

export default SideBarItem;