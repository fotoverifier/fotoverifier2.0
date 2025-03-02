"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoLibrary } from "react-icons/io5";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdAnalytics, MdOutlineFindInPage } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { BiAtom } from "react-icons/bi";
import { Montserrat, Open_Sans } from "next/font/google";
const montserrat = Montserrat({ subsets: ['latin'] });
const opensand = Open_Sans({subsets:['latin']});
const categories = [
  {
    name: "Meta-data Analysis",
    slug: "meta-data_analysis",
    icon: <MdAnalytics size={20} />,
    subcategories: ["Lesson 1", "Lesson 2"],
  },
  {
    name: "Computational Photography",
    slug: "computational_photography",
    icon: <FaCamera size={20} />, // 📷 Icon
    subcategories: ["Lesson 3", "Lesson 4"],
  },
  {
    name: "Tampering Detection",
    slug: "tampering_detection",
    icon: <MdOutlineFindInPage size={20} />, // 🔍 Icon
    subcategories: [],
  },
  {
    name: "Optical/Physical",
    slug: "optical_physical",
    icon: <BiAtom size={20} />, // 🔬 Icon
    subcategories: [],
  },
];

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

  const handleCategoryClick = (slug: string, hasSubcategories: boolean) => {
    if (hasSubcategories) {
      setExpandedCategory((prev) => (prev === slug ? null : slug)); // Toggle subcategories
    } else {
      router.push(`/library/${slug}`); // Navigate directly to category if no subcategories
    }
  };

  return (
    <div className={`flex min-h-screen ${montserrat.className}`}>
      {/* Sidebar */}
      <div
        className={`bg-white ${isSidebarOpen ? "w-1/4" : "w-[9%]"} p-4 shadow-md border-r flex flex-col transition-all duration-300 relative`}
      >
        <div className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between mb-4 border-2 relative">
          <div className="flex items-center">
            <div className="p-2 text-green-800 bg-green-100 rounded-full mr-3">
              <IoLibrary size={24} />
            </div>
            {isSidebarOpen && <h1 className="text-xl font-bold text-green-800 overflow-hidden text-ellipsis whitespace-nowrap">Forensic Techniques</h1>}
          </div>

          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md transition-all"
          >
            {isSidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </div>
        </div>

        {/* Categories */}
        <h2 className={`text-lg font-bold mb-3 ${isSidebarOpen ? "block" : "hidden"}`}>Categories</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <div key={category.slug} className="cursor-pointer">
              {/* Category Click Behavior */}
              <div
                onClick={() => handleCategoryClick(category.slug, category.subcategories.length > 0)}
                className={`px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center ${
                  isSidebarOpen ? "justify-between" : "justify-center"
                }`}
              >
                <span className="flex items-center min-w-0">
                  {category.icon}
                  {isSidebarOpen && (
                    <span className={`ml-2 overflow-hidden text-ellipsis whitespace-nowrap ${opensand.className}`}>{category.name}</span>
                  )}
                </span>

                {/* Show Toggle Arrow Only If Sidebar is Open */}
                {isSidebarOpen && category.subcategories.length > 0 && (
                  <span>
                    {expandedCategory === category.slug ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                  </span>
                )}
              </div>

              {isSidebarOpen &&
                expandedCategory === category.slug &&
                category.subcategories.length > 0 && (
                  <div className="ml-6 mt-2 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory}
                        onClick={() =>
                          router.push(`/library/${category.slug}/${subcategory.toLowerCase().replace(/\s+/g, "_")}`)
                        }
                        className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        {subcategory}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </ul>
      </div>

      {/* Dynamic Content (Right Side) */}
      <section className="flex-1 p-6">{children}</section>
    </div>
  );
}
