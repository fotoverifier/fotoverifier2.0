import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ["latin"] });
// Define the type for props
interface SideBarItemProps {
    text: string;       // The text to display
    icon: React.ReactNode;       // Path to the icon image
    active?: boolean;   
    href: string;  
  }


const SideBarItem: React.FC<SideBarItemProps> = ({ text, icon, active, href }) => {
  return (
    <Link href={href} passHref>
    <div className={`sidebar-item ${active ? 'active' : 'inactive'} ${inter.className}`}>
      {icon && (
        <div className={`box-icon ${active ? 'active' : ''}`}>
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