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
  exif_data: {
    title: 'EXIF Data',
    overview:
      "EXIF (Exchangeable Image File Format) data is a metadata standard that allows digital cameras and software to record and store information about an image, providing valuable insights into the photo's technical and contextual details.",
    methodology:
      'EXIF data extraction involves parsing the metadata embedded within image files, capturing details such as camera make and model, date and time of capture, GPS coordinates, camera settings, and other technical specifications.',
    relatedWork:
      'Research in digital forensics and image analysis has extensively utilized EXIF metadata for authentication, geolocation tracking, device identification, and understanding the provenance of digital images.',
    tabs: {
      definition: {
        title: 'Definition',
        description:
          'EXIF (Exchangeable Image File Format) is a standard specification for image metadata that captures detailed information about digital images, including camera settings, timestamps, and geolocation data.',
        icon: FaBookOpen,
        content: `
          EXIF (Exchangeable Image File Format) is a standard specification for image metadata embedded within digital image files. This metadata provides comprehensive information about the image's creation, technical specifications, and contextual details. 

          Key components of EXIF data include:
          - Camera Make and Model
          - Date and Time of Image Capture
          - Camera Settings:
            * Aperture (f-number)
            * Shutter Speed
            * ISO Sensitivity
            * Focal Length
          - GPS Coordinates (if available)
          - Image Dimensions
          - Color Space Information
          - Software Used for Image Processing

          EXIF metadata plays a crucial role in digital forensics, photography, and image analysis by providing a detailed digital fingerprint of an image's origin and characteristics.`,
      },
      example: {
        title: 'Example',
        description:
          'Demonstration of EXIF data extraction, showcasing the types of information that can be retrieved from a digital image file.',
        icon: FaChartLine,
        content: `
          Example of EXIF Data Extraction:

          Image: Landscape Photograph
          Camera: Canon EOS 5D Mark IV
          Capture Date: 2023-07-15 14:30:22

          Technical Details:
          - Aperture: f/8.0
          - Shutter Speed: 1/250 sec
          - ISO: 100
          - Focal Length: 24mm
          - GPS Coordinates: 40.7128° N, 74.0060° W (New York City)

          Demonstration of parsing EXIF data using different tools:
          1. Metadata Extraction Libraries
          2. Command-line Tools
          3. Forensic Analysis Software

          Potential Use Cases:
          - Verifying image authenticity
          - Understanding photographic techniques
          - Tracking image geolocation
          - Digital forensics investigations`,
      },
      details: {
        title: 'Technical Details',
        description:
          'In-depth exploration of EXIF metadata structure, parsing techniques, and the significance of different metadata fields in digital image forensics.',
        icon: FaClipboardList,
        content: `
          Technical Architecture of EXIF Metadata:

          1. Metadata Structure
          - Stored in JPEG, TIFF, and RIFF file formats
          - Uses Tagged Image File Format (TIFF) headers
          - Organized as a series of tags with specific identifiers

          2. Parsing Techniques
          - Binary metadata extraction
          - Specialized libraries and tools
          - Handling different image file formats

          3. Metadata Tags Categories
          - Image Data Tags
          - Camera Settings Tags
          - Geolocation Tags
          - Thumbnail Information Tags

          4. Challenges in EXIF Data Analysis
          - Metadata can be deliberately modified
          - Inconsistent implementation across devices
          - Privacy and information leakage concerns

          5. Forensic Significance
          - Provenance tracking
          - Authentication verification
          - Detecting image manipulation`,
      },
      relatedWork: {
        title: 'Related Work',
        description:
          'Research and academic publications exploring EXIF metadata in digital forensics and image analysis.',
        icon: FaLink,
        content: `
          Significant Research and Publications in EXIF Metadata Analysis:

          1. Academic Publications:
          - "Forensic Analysis of Digital Images Using EXIF Metadata" - Journal of Digital Forensics, 2019
          - "Geolocation Privacy Risks in Image Metadata" - ACM Conference on Computer and Communications Security, 2020

          2. Key Research Areas:
          - Image Authentication Techniques
          - Metadata Forensics
          - Privacy Implications of Embedded Metadata

          3. Notable Research Institutions:
          - Digital Forensics Research Lab, University of California
          - Cybersecurity and Forensics Research Center, MIT
          - Image Forensics Group, Stanford University

          4. Emerging Research Directions:
          - AI-powered EXIF data analysis
          - Machine learning for metadata anomaly detection
          - Cross-platform metadata standardization

          5. Recommended References:
          - "Digital Image Forensics: There is More to a Picture Than Meets the Eye"
          - "Metadata Extraction and Analysis: Techniques and Applications"`,
      },
    },
  },
};

export default function SubcategoryPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<
    keyof NonNullable<SubcategoryContent['tabs']> | null
  >(null);

  const subcategory = Array.isArray(params.subcategory)
    ? params.subcategory[0]
    : params.subcategory;

  const formattedSubcategory = subcategory
    ? subcategory.replace(/_/g, ' ')
    : 'Unknown Subcategory';

  const content = subcategoryContents[subcategory as string] || {
    overview: 'No specific content available for this subcategory.',
    methodology: 'Methodology details are pending.',
    relatedWork: 'Related work information is not yet available.',
  };

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
                      ? content.tabs[activeTab]?.content
                          .split('\n')
                          .map((line) => `<p>${line.trim()}</p>`)
                          .join('')
                      : '',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <hr className="border-t-2 border-[#03564a] my-8" />
      <section>
        <h2 className="text-2xl font-bold text-[#03564a] mb-4">
          Paper - Related Work
        </h2>
        <p className="text-gray-700">{content.relatedWork}</p>
        <div className="mt-6 flex space-x-4">
          <a
            href="#"
            className="flex items-center space-x-2 bg-[#03564a] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <FaFilePdf />
            <span>Download Research Paper</span>
          </a>
        </div>
      </section>
    </div>
  );
}
