import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

// Define the type for props
interface SideBarItemProps {
    text: string;       // The text to display
    icon: React.ReactNode;       // Path to the icon image
    active?: boolean;   // Optional boolean to indicate active state
    href: string;  
  }


const SideBarItem: React.FC<SideBarItemProps> = ({ text, icon, active, href }) => {
  return (
    <Link href={href} passHref>
    <div className={`sidebar-item ${active ? 'active' : 'inactive'}`}>
      {icon && (
        <div className={`box-icon ${active ? 'active' : ''}`}>
       <div className='icon-item'>
       {icon}
     </div>
     </div>
      )}
      <div className="text">{text}</div>
    </div>
    </Link>
  );
}

export default SideBarItem;