'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CiMenuBurger } from 'react-icons/ci';
import Logo from '@/assets/icon_main_white.svg';
import '@/components/sidebar/sidebar_specialized.css';
import Image from 'next/image';
interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

interface SidebarProps {
  children: ReactNode;
  logo?: string;
  title?: string;
}

const Sidebar_Specialized: React.FC<SidebarProps> = ({
  children,
  logo,
  title = 'Fotoverifier',
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r">
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-hidden">
            {logo ? (
              <div
                className={`overflow-hidden transition-all ${expanded ? 'w-10 h-10' : 'w-0'}`}
              >
                <Image
                  src={logo as string}
                  width={40}
                  height={40}
                  className="rounded-md object-contain"
                  alt="Logo"
                />
              </div>
            ) : null}
            <div
              className={`overflow-hidden transition-all  ${expanded ? 'w-fit opacity-100' : 'w-0 opacity-0'} font-bold text-gray-800 text-lg`}
            >
              {title}
            </div>
          </div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all shadow-sm"
          >
            {expanded ? (
              <FaChevronLeft size={16} />
            ) : (
              <FaChevronRight size={16} />
            )}
          </button>
        </div>

        <div className="flex w-full justify-center my-2">
          <div className="w-5/6 h-px bg-gray-100 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-2 space-y-1">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t border-gray-100 mt-2">
          <div className="flex p-4 items-center">
            <div
              className={`flex justify-between items-center overflow-hidden transition-all  ${
                expanded ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-gray-700">
                  Specialized mode
                </h4>
                <p className="text-xs text-gray-500">Advanced features</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all ">
                <CiMenuBurger size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  alert = false,
}) => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('SidebarItem must be used within a Sidebar');
  }

  const { expanded } = context;

  return (
    <li
      className={`relative flex items-center py-3 px-4 my-1 font-medium rounded-xl cursor-pointer transition-all  group ${
        active
          ? 'bg-gradient-to-r from-green-700 to-green-600 text-white shadow-sm shadow-green-100/50'
          : 'hover:bg-gray-50 text-gray-600 hover:text-gray-800'
      }`}
    >
      <div
        className={`${active ? 'text-white' : 'text-gray-500'} transition-colors `}
      >
        {icon}
      </div>
      <span
        className={`overflow-hidden transition-all  ${expanded ? 'w-fit ml-3 opacity-100' : 'w-0 opacity-0'}`}
      >
        {text}
      </span>

      {alert && (
        <div
          className={`absolute ${expanded ? 'right-3' : 'top-2 right-2'} w-2 h-2 rounded-full bg-red-500 ring-2 ring-white`}
        />
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-lg px-3 py-2 ml-6 bg-white text-gray-700 text-sm invisible opacity-0 -translate-x-3 transition-all shadow-md z-10 whitespace-nowrap font-medium
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
          {alert && (
            <span className="ml-2 inline-block w-2 h-2 rounded-full bg-red-500"></span>
          )}
        </div>
      )}
    </li>
  );
};

export default Sidebar_Specialized;
