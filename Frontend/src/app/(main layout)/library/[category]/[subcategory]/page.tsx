'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBookOpen,
  FaChartLine,
  FaFilePdf,
  FaClipboardList,
  FaLink,
} from 'react-icons/fa';
import detailedContent from "@/terminologies/lib.json"
interface SectionContent {
  title: string;
  description: string;
  icon: React.ElementType;
  content: string;
}

interface SubcategoryContent {
  title?: string;
  overview: string;
  methodology: string;
  relatedWork: string;
  tabs?: {
    definition?: SectionContent;
    example?: SectionContent;
    details?: SectionContent;
    relatedWork?: SectionContent;
  };
}

const subcategoryContents: { [key: string]: SubcategoryContent } = {
  exif_data:{
    title: detailedContent.exif_data.title,
    overview: detailedContent.exif_data.overview,
    methodology: detailedContent.exif_data.methodology,
    relatedWork: detailedContent.exif_data.relatedWork,
    tabs: {
      definition :{
        title: detailedContent.exif_data.tabs.definition.title,
        description: detailedContent.exif_data.tabs.definition.description,
        icon: FaBookOpen,
        content: detailedContent.exif_data.tabs.definition.content,
      },
      example:{
        title: detailedContent.exif_data.tabs.example.title,
        description: detailedContent.exif_data.tabs.example.description,
        icon: FaChartLine,
        content: detailedContent.exif_data.tabs.example.content,
      },
      details: {
        title: detailedContent.exif_data.tabs.details.title,
        description: detailedContent.exif_data.tabs.details.description,
        icon: FaFilePdf,
        content: detailedContent.exif_data.tabs.details.content,
      },
      relatedWork: {
        title: detailedContent.exif_data.tabs.relatedWork.title,
        description: detailedContent.exif_data.tabs.relatedWork.description,
        icon: FaLink,
        content: detailedContent.exif_data.tabs.relatedWork.content,
      },
    }
  },
    jpeg_ghost: {
    title: detailedContent.jpeg_ghost.title,
    overview: detailedContent.jpeg_ghost.overview,
    methodology: detailedContent.jpeg_ghost.methodology,
    relatedWork: detailedContent.jpeg_ghost.relatedWork,
    tabs: {
      definition: {
        title: detailedContent.jpeg_ghost.tabs.definition.title,
        description: detailedContent.jpeg_ghost.tabs.definition.description,
        icon: FaBookOpen,
        content: detailedContent.jpeg_ghost.tabs.definition.content,
      },
      example: {
        title: detailedContent.jpeg_ghost.tabs.example.title,
        description: detailedContent.jpeg_ghost.tabs.example.description,
        icon: FaChartLine,
        content: detailedContent.jpeg_ghost.tabs.example.content,
      },
      details: {
        title: detailedContent.jpeg_ghost.tabs.details.title,
        description: detailedContent.jpeg_ghost.tabs.details.description,
         icon: FaFilePdf,
        content: detailedContent.jpeg_ghost.tabs.details.content,
      },
      relatedWork: {
        title: detailedContent.jpeg_ghost.tabs.relatedWork.title,
        description: detailedContent.jpeg_ghost.tabs.relatedWork.description,
        icon: FaLink,
        content: detailedContent.jpeg_ghost.tabs.relatedWork.content,
      },
    }
  },
  ela: {
  title: detailedContent.ela.title,
  overview: detailedContent.ela.overview,
  methodology: detailedContent.ela.methodology,
  relatedWork: detailedContent.ela.relatedWork,
  tabs: {
    definition: {
      title: detailedContent.ela.tabs.definition.title,
      description: detailedContent.ela.tabs.definition.description,
      icon: FaBookOpen,
      content: detailedContent.ela.tabs.definition.content,
    },
    example: {
      title: detailedContent.ela.tabs.example.title,
      description: detailedContent.ela.tabs.example.description,
      icon: FaChartLine,
      content: detailedContent.ela.tabs.example.content,
    },
    details: {
      title: detailedContent.ela.tabs.details.title,
      description: detailedContent.ela.tabs.details.description,
      icon: FaFilePdf,
      content: detailedContent.ela.tabs.details.content,
    },
    relatedWork: {
      title: detailedContent.ela.tabs.relatedWork.title,
      description: detailedContent.ela.tabs.relatedWork.description,
      icon: FaLink,
      content: detailedContent.ela.tabs.relatedWork.content,
    },
  }
},
luminance_gradient: {
  title: detailedContent.luminance_gradient.title,
  overview: detailedContent.luminance_gradient.overview,
  methodology: detailedContent.luminance_gradient.methodology,
  relatedWork: detailedContent.luminance_gradient.relatedWork,
  tabs: {
    definition: {
      title: detailedContent.luminance_gradient.tabs.definition.title,
      description: detailedContent.luminance_gradient.tabs.definition.description,
      icon: FaBookOpen,
      content: detailedContent.luminance_gradient.tabs.definition.content,
    },
    example: {
      title: detailedContent.luminance_gradient.tabs.example.title,
      description: detailedContent.luminance_gradient.tabs.example.description,
      icon: FaChartLine,
      content: detailedContent.luminance_gradient.tabs.example.content,
    },
    details: {
      title: detailedContent.luminance_gradient.tabs.details.title,
      description: detailedContent.luminance_gradient.tabs.details.description,
      icon: FaFilePdf,
      content: detailedContent.luminance_gradient.tabs.details.content,
    },
    relatedWork: {
      title: detailedContent.luminance_gradient.tabs.relatedWork.title,
      description: detailedContent.luminance_gradient.tabs.relatedWork.description,
      icon: FaLink,
      content: detailedContent.luminance_gradient.tabs.relatedWork.content,
    },
  }
},
noise_modification: {
  title: detailedContent.noise_modification.title,
  overview: detailedContent.noise_modification.overview,
  methodology: detailedContent.noise_modification.methodology,
  relatedWork: detailedContent.noise_modification.relatedWork,
  tabs: {
    definition: {
      title: detailedContent.noise_modification.tabs.definition.title,
      description: detailedContent.noise_modification.tabs.definition.description,
      icon: FaBookOpen,
      content: detailedContent.noise_modification.tabs.definition.content,
    },
    example: {
      title: detailedContent.noise_modification.tabs.example.title,
      description: detailedContent.noise_modification.tabs.example.description,
      icon: FaChartLine,
      content: detailedContent.noise_modification.tabs.example.content,
    },
    details: {
      title: detailedContent.noise_modification.tabs.details.title,
      description: detailedContent.noise_modification.tabs.details.description,
      icon: FaFilePdf,
      content: detailedContent.noise_modification.tabs.details.content,
    },
    relatedWork: {
      title: detailedContent.noise_modification.tabs.relatedWork.title,
      description: detailedContent.noise_modification.tabs.relatedWork.description,
      icon: FaLink,
      content: detailedContent.noise_modification.tabs.relatedWork.content,
    },
  }
}
};

export default function SubcategoryPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<
    keyof NonNullable<SubcategoryContent['tabs']> | null
  >(null);

  const subcategory = Array.isArray(params.subcategory)
    ? params.subcategory[0]
    : params.subcategory;

  const normalizedSubcategory = subcategory
    ? subcategory.toLowerCase().replace(/\s+/g, '_')
    : 'unknown';

  const content = subcategoryContents[normalizedSubcategory] || {
    overview: 'No specific content available for this subcategory.',
    methodology: 'Methodology details are pending.',
    relatedWork: 'Related work information is not yet available.',
  };

  const formattedSubcategory = content.title || normalizedSubcategory.replace(/_/g, ' ');

  return (
    <div className="max-w-full mx-auto p-6 h-full bg-gray-50">
      <section className="mb-8 p-4 border-2 border-[#03564a] rounded-lg bg-white shadow-md">
        <h1 className="p-2 border-2 rounded-full border-[#03564a] w-fit text-3xl font-bold text-[#03564a] mb-4">
          {formattedSubcategory}
        </h1>
        <p className="text-lg text-gray-700">{content.overview}</p>
      </section>

      {content.tabs && (
        <div className="mb-8">
          <div className="flex space-x-4 mb-6">
            {Object.entries(content.tabs).map(([key, tabContent]) => {
              const Tab = tabContent.icon;
              return (
                <div
                  key={key}
                  onClick={() =>
                    setActiveTab(
                      key as keyof NonNullable<SubcategoryContent['tabs']>
                    )
                  }
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                    ${
                      activeTab === key
                        ? 'bg-[#03564a] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  <Tab />
                  <span>{tabContent.title}</span>
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeTab && content.tabs[activeTab] && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-xl font-bold text-[#03564a] mb-4">
                  {content.tabs[activeTab]?.title}
                </h3>
                 <div
    className="text-gray-700 prose max-w-none"
    dangerouslySetInnerHTML={{
      __html: content.tabs[activeTab]?.content
        ? content.tabs[activeTab].content
            .split('\n')
            .map((line) => {
              const trimmedLine = line.trim();
                // Replace **...** with <strong>...</strong>
                const processedLine = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                if (/^\d+\.\s+/.test(trimmedLine)) {
                  // Numbered bullet points with border and bold
                  return `<div class="border border-gray-300 p-2 mb-2 rounded-xl my-5"><strong>${processedLine}</strong></div>`;
                } else if (/^-\s+/.test(trimmedLine)) {
                  return `<p class="ml-6">${processedLine}</p>`;
                }
                return `<div>${processedLine}</div>`;
            })
            .join('')
        : '',
    }}
  />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      
    </div>
  );
}