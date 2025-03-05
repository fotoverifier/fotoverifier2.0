import React from 'react';
import '@/styles/head/header.css';
import iconSrc from '@/assets/icon_main_white.svg';
import Image from 'next/image';
import { CiMenuBurger } from 'react-icons/ci';
import { Inter } from 'next/font/google';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] });
const Header = () => {
  return (
    <div className="header-container">
      <div className="menu-header-icon flex items-center justify-center">
        <CiMenuBurger size={30} color="white" />
      </div>
      <div className="header-main-icon-container ml-10 flex items-center">
        <Link href="/home">
          <Image
            src={iconSrc}
            width={38}
            height={38}
            alt="Icon description"
            className="ml-5"
          />
        </Link>
        <div
          className={`text-white font-sans ml-10 font-bold text-3xl ${inter.className}`}
        >
          {' '}
          FotoVerifier{' '}
        </div>
      </div>
    </div>
  );
};

export default Header;
