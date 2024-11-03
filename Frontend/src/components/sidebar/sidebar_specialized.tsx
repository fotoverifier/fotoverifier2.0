"use client";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import Logo from "@/assets/icon_main_white.svg"
import Image from "next/image";
interface SidebarContextProps {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProps {
  children: ReactNode;
  logo?: string;   // Optional logo prop
  title?: string;  // Optional title prop
  
}

const Sidebar_Specialized: React.FC<SidebarProps> = ({  children, logo, title = "Fotoverifier" }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
           {logo ? (
            <Image
              src={logo as string}  
              className={`overflow-hidden transition-all ${expanded ? "w-16" : "w-0"}`}
              alt="Logo"
            />
          ) : null}
          <div className={`overflow-hidden transition-all ${expanded ? "w-fit" : "w-0"} font-semibold text-green-950`}> {title}</div>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>
        <div className="flex w-full justify-center">
        <div className="w-5/6 h-px bg-black"> </div>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
         
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <CiMenuBurger size={20} />
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

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active = false, alert = false }) => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("SidebarItem must be used within a Sidebar");
  }

  const { expanded } = context;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800" : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-fit ml-3" : "w-0"}`}>{text}</span>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-green-400 ${expanded ? "" : "top-2"}`} />}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-green-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default Sidebar_Specialized;
