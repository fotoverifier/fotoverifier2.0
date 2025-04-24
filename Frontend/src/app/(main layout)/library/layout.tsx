'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoLibrary } from 'react-icons/io5';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdAnalytics, MdOutlineFindInPage } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { BiAtom } from 'react-icons/bi';
import { Montserrat, Open_Sans, Source_Code_Pro } from 'next/font/google';
import Link from 'next/link';
const montserrat = Montserrat({ subsets: ['latin'] });
const opensand = Open_Sans({ subsets: ['latin'] });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });
const categories = [
  {
    name: 'Meta-data Analysis',
    slug: 'meta_data_analysis',
    icon: <MdAnalytics size={20} />,
    subcategories: ['EXIF Data'],
  },
  {
    name: 'Computational Photography',
    slug: 'computational_photography',
    icon: <FaCamera size={20} />,
    subcategories: ['Noise Modification', 'Luminance Gradient'],
  },
  {
    name: 'Tampering Detection',
    slug: 'tampering_detection',
    icon: <MdOutlineFindInPage size={20} />,
    subcategories: ['JPEG Ghost', 'ELA'],
  },
  {
    name: 'Optical/Physical',
    slug: 'optical_physical',
    icon: <BiAtom size={20} />,
    subcategories: [],
  },
];

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleCategoryClick = (slug: string, hasSubcategories: boolean) => {
    if (hasSubcategories) {
      setExpandedCategory((prev) => (prev === slug ? null : slug));
    } else {
      router.push(`/library/${slug}`);
    }
  };

  return (
    <div className={`flex h-screen ${sourceCodePro.className}`}>
      <div
        className={`bg-white ${
          isSidebarOpen ? 'w-1/4' : 'w-[9%]'
        } p-4 shadow-md border-r flex flex-col transition-all duration-300 relative overflow-y-auto`}
      >
        <div className="bg-white shadow-md p-4 rounded-lg flex items-center justify-between mb-4 border-2 relative flex-shrink-0">
          <div className="flex items-center min-w-0">
            <div className="p-2 text-green-800 bg-green-100 rounded-full mr-3">
              <IoLibrary size={24} />
            </div>
            {isSidebarOpen && (
              <h1 className="text-lg font-bold text-green-800 overflow-hidden text-ellipsis whitespace-nowrap">
                Forensic Techniques
              </h1>
            )}
          </div>

          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-md transition-all cursor-pointer"
          >
            {isSidebarOpen ? (
              <FiChevronLeft size={20} />
            ) : (
              <FiChevronRight size={20} />
            )}
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          <h2
            className={`text-lg font-bold mb-3 ${
              isSidebarOpen ? 'block' : 'hidden'
            } sticky top-0 bg-white pt-1`}
          >
            Categories
          </h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <div key={category.slug} className="cursor-pointer">
                <div
                  onClick={() =>
                    handleCategoryClick(
                      category.slug,
                      category.subcategories.length > 0
                    )
                  }
                  className={`px-4 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center ${
                    isSidebarOpen ? 'justify-between' : 'justify-center'
                  }`}
                >
                  <span className="flex items-center min-w-0">
                    <span className="mr-2 flex-shrink-0 border-2 rounded-full p-1">{category.icon}</span>
                    {isSidebarOpen && (
                      <span
                        className={`ml-2 overflow-hidden text-base text-ellipsis whitespace-nowrap ${montserrat.className}`}
                      >
                        {category.name}
                      </span>
                    )}
                  </span>

                  {isSidebarOpen && category.subcategories.length > 0 && (
                    <span>
                      {expandedCategory === category.slug ? (
                        <TiArrowSortedUp />
                      ) : (
                        <TiArrowSortedDown />
                      )}
                    </span>
                  )}
                </div>

                 {isSidebarOpen &&
        expandedCategory === category.slug &&
        category.subcategories.length > 0 && (
          <div className="ml-6 mt-2 space-y-2">
            {category.subcategories.map((subcategory) => {
              const targetUrl = `/library/${category.slug}/${subcategory.toLowerCase().replace(/\s+/g, '_')}`;
              return (
                <Link
                  key={subcategory}
                  href={targetUrl}
                  className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 block"
                  onClick={(e) => e.stopPropagation()} 
                >
                  {subcategory}
                </Link>
              );
            })}
          </div>
                  )}
              </div>
            ))}
          </ul>
        </div>
      </div>

      <section className="flex-1 overflow-y-auto">{children}</section>
    </div>
  );
}
