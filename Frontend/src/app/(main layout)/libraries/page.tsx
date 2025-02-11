"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoLibrary } from "react-icons/io5";
import { Inter } from "next/font/google";
import TreeView from "./treeComponent";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

const inter = Inter({ subsets: ["latin"] });

const Libraries = () => {
  // Data for categories and subcategories
  const categories = [
    {
      name: "Meta-data Analysis",
      subcategories: ["Lesson 1", "Lesson 2"],
    },
    {
      name: "Computational Photography",
      subcategories: ["Lesson 3", "Lesson 4"],
    },
    {
      name: "Tampering Detection",
      subcategories: [],
    },
    {
      name: "Optical/Physical",
      subcategories: [],
    },
  ];

  const treeData = [
    {
      label: "Originality",
      children: [
        {
          label: "Exif Data",
        },
      ],
    },
    {
      label: "Location",
      children: [
        {
          label: "Extract",
        },
      ],
    },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null); // Track expanded categories
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null); // Track expanded subcategories

  // Sync state with query parameters
  useEffect(() => {
    const category = searchParams.get("category") || categories[0].name; // Default to the first category
    const subcategory = searchParams.get("subcategory") || "";
    setActiveCategory(category);
    setActiveSubcategory(subcategory);
  }, [searchParams]);

  const toggleExpandCategory = (categoryName: string) => {
    setExpandedCategory((prev) =>
      prev === categoryName ? null : categoryName
    );
    setExpandedSubcategory(null); // Reset expanded subcategory when switching categories
  };

  const toggleExpandSubcategory = (subcategoryName: string) => {
    setExpandedSubcategory((prev) =>
      prev === subcategoryName ? null : subcategoryName
    );
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setActiveSubcategory("");
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "_");
    router.push(`/libraries/category=${formattedCategory}`); // Update route
  };

  const handleSubcategoryClick = (
    categoryName: string,
    subcategoryName: string
  ) => {
    setActiveCategory(categoryName);
    setActiveSubcategory(subcategoryName);
    const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, "_");
    const formattedSubcategory = subcategoryName
      .toLowerCase()
      .replace(/\s+/g, "_");
    router.push(
      `/libraries/category=${formattedCategory}/${formattedSubcategory}`
    ); // Update route
  };

  return (
    <div className="min-h-screen bg-white flex flex-col p-6">
      {/* Header Section */}
      <header className="flex items-center space-x-4 bg-white p-4 shadow rounded-lg border">
        <div className="flex items-center h-fit w-fit p-2 rounded-full border-2 border-green-800">
          <div className="p-2 text-green-800 bg-green-100 rounded-full">
            <IoLibrary size={24} />
          </div>
        </div>
        <div className={`font-bold text-2xl ${inter.className}`}>
          Forensic Techniques
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Sidebar - Categories */}
        <aside className="bg-white p-4 shadow rounded-lg w-full lg:w-1/4 border h-fit overflow-y-auto border">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="cursor-pointer">
                {/* Parent Category */}
                <div
                  onClick={() => toggleExpandCategory(category.name)}
                  className={`px-4 py-2 rounded-lg flex justify-between items-center ${
                    activeCategory === category.name
                      ? "bg-green-200 text-green-800 font-semibold"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                  {category.subcategories.length > 0 && (
                    <span className="ml-2">
                      {expandedCategory === category.name ? (
                        <TiArrowSortedDown />
                      ) : (
                        <TiArrowSortedUp />
                      )}
                    </span>
                  )}
                </div>

                {/* Subcategories */}
                {expandedCategory === category.name &&
                  category.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="ml-6">
                      <div
                        onClick={() =>
                          handleSubcategoryClick(category.name, subcategory)
                        }
                        className={`my-2 px-4 py-2 rounded-lg cursor-pointer flex justify-between items-center ${
                          activeSubcategory === subcategory
                            ? "bg-blue-200 text-blue-800 font-semibold"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {subcategory}
                        <span className="ml-2">
                          {expandedSubcategory === subcategory ? (
                            <TiArrowSortedDown />
                          ) : (
                            <TiArrowSortedUp />
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
              </li>
            ))}
          </ul>
        </aside>

        {/* Content Section */}
        <section className="flex-1 bg-white p-6 shadow rounded-lg border">
          <h2 className="text-xl font-bold mb-4">
            {activeSubcategory || activeCategory}
          </h2>
          <div className="mb-6 text-gray-600">
            {activeSubcategory
              ? `You are viewing content for the subcategory "${activeSubcategory}" in "${activeCategory}".`
              : `Explore various forensic techniques and methodologies within the "${activeCategory}" category.`}
          </div>

          {/* TreeView Section */}
          {activeSubcategory === "Lesson 1" || activeSubcategory === "Lesson 2" ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Tree View</h3>
              <TreeView data={treeData} />
            </div>
          ) : (
            <div>Select a subcategory to view more details.</div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Libraries;
