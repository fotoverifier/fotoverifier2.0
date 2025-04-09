'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { VscSymbolMethod } from 'react-icons/vsc';
import JPEG_1 from '@/assets/jpg1.jpg';
import JPEG_2 from '@/assets/jpg2.jpg';
interface Reference {
  title: string;
  url: string;
}

const Specialized_dif_ghost = () => {
  const [activeTab, setActiveTab] = useState<
    'definition' | 'example' | 'showcase'
  >('example');

  const references: Reference[] = [
    {
      title: 'JPEG Ghost Analysis',
      url: 'https://example.com/jpeg-ghost',
    },
    {
      title: 'Image Forensics Techniques',
      url: 'https://example.com/image-forensics',
    },
    {
      title: 'Detecting Spliced Images',
      url: 'https://example.com/spliced-images',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col">
      <div className="bg-white shadow-md rounded-lg mb-6 p-4">
        <div className="flex items-center text-2xl font-semibold text-teal-800">
          <div className="mr-4 bg-teal-100 text-teal-600 p-2 rounded-full">
            <VscSymbolMethod size={24} />
          </div>
          JPEG Ghost Forensics
        </div>
      </div>

      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('showcase')}
          className={`
            px-4 py-2 rounded-lg transition-all
            ${
              activeTab === 'showcase'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          Showcase
        </button>

        <button
          onClick={() => setActiveTab('example')}
          className={`
            px-4 py-2 ml-2 rounded-lg transition-all
            ${
              activeTab === 'example'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          Example
        </button>

        <button
          onClick={() => setActiveTab('definition')}
          className={`
            px-4 py-2 ml-2 rounded-lg transition-all
            ${
              activeTab === 'definition'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          Definition
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'example' && (
          <motion.div
            key="example"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white shadow-md rounded-lg p-6 flex-grow"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4 text-teal-800">
                  Input Picture
                </h3>
                <div className="border-2 border-teal-100 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={JPEG_1}
                    alt="Input image"
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4 text-teal-800">
                  Output Picture
                </h3>
                <div className="border-2 border-teal-100 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={JPEG_2}
                    alt="Output image"
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-700 italic">
                Note: A square in the middle of the image was cropped and saved
                with lower quality.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'showcase' && (
          <motion.div
            key="example"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white shadow-md rounded-lg p-6 flex-grow"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4 text-teal-800">
                  Input Picture
                </h3>
                <div className="border-2 border-teal-100 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/yourimage"
                    alt="Input image"
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-4 text-teal-800">
                  Output Picture
                </h3>
                <div className="border-2 border-teal-100 rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="/processedimg"
                    alt="Output image"
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-700 italic">
                Note: A square in the middle of the image was cropped and saved
                with lower quality.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'definition' && (
          <motion.div
            key="definition"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white shadow-md rounded-lg p-6 flex-grow"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold text-teal-800 mb-4">
                  What is JPEG Ghost?
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  JPEG Ghost is an advanced image forensics technique used to
                  detect spliced or manipulated images by analyzing differences
                  in the Color Filter Array (CFA) across various image regions.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-teal-800 mb-4">
                  References
                </h2>
                <ul className="space-y-2">
                  {references.map((ref, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 rounded-md p-3 flex items-center justify-between"
                    >
                      <span className="text-gray-700 mr-2">
                        {index + 1}. {ref.title}
                      </span>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-800 transition-colors"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Specialized_dif_ghost;
