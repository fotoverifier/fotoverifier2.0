'use client';
import { useRouter, usePathname } from 'next/navigation';
import { IoLibrary } from 'react-icons/io5';
import { MdPolicy } from 'react-icons/md';
import {
  FaUpload,
  FaHome,
  FaGithub,
  FaMoon,
  FaSun,
  FaGlobe,
} from 'react-icons/fa';
import IconMain from '@/assets/icon_main.svg';
import Image from 'next/image';
import { useState } from 'react';

const categories = [
  { name: 'Home', slug: '/dashboard', icon: <FaHome size={20} /> },
  { name: 'Upload', slug: '/upload', icon: <FaUpload size={20} /> },
  { name: 'Library', slug: '/library', icon: <IoLibrary size={20} /> },
  { name: 'Policy', slug: '/privacy', icon: <MdPolicy size={20} /> },
  { name: 'GitHub', slug: 'https://github.com', icon: <FaGithub size={20} /> },
];

export default function Sidebar_Alt() {
  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('EN');

  return (
    <div
      className={`bg-white w-[7%] p-4 shadow-md border-r flex flex-col transition-all duration-300 relative`}
    >
      <div className="bg-white shadow-md p-4 rounded-lg flex items-center justify-center mb-4 border-2">
        <div className="text-green-800 bg-green-100 rounded-full">
          <Image src={IconMain} width={50} height={50} alt="" />
        </div>
      </div>

      <div className="w-full h-[2px] bg-green-800 my-3"></div>

      <ul className="space-y-2 flex-grow">
        {categories.map((category) => {
          const isActive = pathname === category.slug;
          return (
            <div key={category.slug} className="relative group cursor-pointer">
              <div
                onClick={() =>
                  category.slug.startsWith('http')
                    ? window.open(category.slug, '_blank')
                    : router.push(category.slug)
                }
                className={`px-4 py-3 rounded-lg flex items-center justify-center relative transition-colors duration-300 
                  ${isActive ? 'bg-green-200 text-green-800 font-bold' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <div className="flex justify-center items-center w-6 h-6">
                  {category.icon}
                </div>
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {category.name}
                </span>
              </div>
            </div>
          );
        })}
      </ul>

      <div className="mt-auto space-y-2">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 transition-all duration-300"
        >
          {darkMode ? (
            <FaSun size={20} className="text-yellow-500" />
          ) : (
            <FaMoon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Language Toggle Button */}
        <button
          onClick={() => setLanguage(language === 'EN' ? 'VN' : 'EN')}
          className="w-fit flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-3 transition-all duration-300"
        >
          <FaGlobe size={20} />
          <span className="ml-2 font-semibold w-6 text-center">{language}</span>
        </button>
      </div>
    </div>
  );
}
