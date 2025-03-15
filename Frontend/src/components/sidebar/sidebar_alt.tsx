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
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const categories = [
  { name: 'Home', slug: '/dashboard', icon: <FaHome size={20} /> },
  { name: 'Upload', slug: '/upload', icon: <FaUpload size={20} /> },
  { name: 'Library', slug: '/library', icon: <IoLibrary size={20} /> },
  { name: 'Policy', slug: '/privacy', icon: <MdPolicy size={20} /> },
  { name: 'GitHub', slug: 'https://github.com', icon: <FaGithub size={20} /> },
];

const languages = [
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'vi', name: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png' },
  { code: 'no', name: 'Norsk', flag: 'https://flagcdn.com/w40/no.png' },
];

export default function Sidebar_Alt() {
  const { t } = useLanguage();

  const categories = [
    { name: t('Home'), slug: '/dashboard', icon: <FaHome size={20} /> },
    { name: t('Upload'), slug: '/upload', icon: <FaUpload size={20} /> },
    { name: t('Library'), slug: '/library', icon: <IoLibrary size={20} /> },
    { name: t('Policy'), slug: '/privacy', icon: <MdPolicy size={20} /> },
    {
      name: 'GitHub',
      slug: 'https://github.com',
      icon: <FaGithub size={20} />,
    },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  const { setLocale, locale } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.code === locale) || languages[0]
  );

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const matchedLang = languages.find((lang) => lang.code === locale);
    if (matchedLang) {
      setSelectedLanguage(matchedLang);
    }
  }, [locale]);

  const handleLanguageChange = (lang: any) => {
    setLocale(lang.code);
    setIsOpen(false);
  };

  return (
    <div
      className={`bg-white w-[7%] p-3 shadow-md border-r flex flex-col transition-all duration-300 relative`}
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

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-20 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg p-2 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span className="ml-2 font-semibold text-center">
            {selectedLanguage.code.toUpperCase()}
          </span>
        </button>

        {isOpen && (
          <div className="absolute left-full ml-2 bottom-2 w-48 bg-white shadow-lg rounded-lg py-1 z-10 border-2">
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center ${
                  selectedLanguage.code === lang.code
                    ? 'bg-gray-50 font-medium'
                    : ''
                }`}
              >
                <img
                  src={lang.flag}
                  alt={lang.code}
                  className="h-5 w-8 mr-2 object-cover"
                />
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
