import React, { useState } from 'react';
import Image from 'next/image';
import { SearchResult } from '@/interface/interface';
import { IoIosReverseCamera } from 'react-icons/io';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
interface ReverseImgProp {
  searchResult: SearchResult[] | null;
  loading: boolean;
}
const searchResult = [
  {
    title: 'Sample Image 1',
    redirect_link: 'https://example.com/image1.jpg',
  },
  {
    title: 'Sample Image 2',
    redirect_link: 'https://example.com/image2.jpg',
  },
  {
    title: 'Sample Image 3',
    redirect_link: 'https://example.com/image3.jpg',
  },
  {
    title: 'Sample Image 3',
    redirect_link: 'https://example.com/image3.jpg',
  },
  {
    title: 'Sample Image 3',
    redirect_link: 'https://example.com/image3.jpg',
  },
];
const ReverseImgResult: React.FC<ReverseImgProp> = ({
  searchResult,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full h-full p-5">
      <div className="flex items-center justify-center">
        <div className="circle_2">
          {' '}
          <IoIosReverseCamera />
        </div>
        <div className="font-bold text-lg ml-2">Reversed Search</div>
        <div onClick={openModal} className="focus:outline-none ml-auto">
          <div
            className={`flex justify-center rounded-md border-black border-2 p-1 hover:bg-black hover:text-white ${inter.className}`}
          >
            Show Detail
          </div>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-hidden overflow-y-auto h-2/3 p-2 mt-2">
          {searchResult?.map((result, index) => (
            <div key={index}>
              <a href={result.redirect_link} className="hover: underline">
                {index + 1}. {result.title}
              </a>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4"> Reversed Link Search</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {searchResult?.map((result, index) => (
                  <div key={index}>
                    <a href={result.redirect_link} className="hover: underline">
                      {index + 1}. {result.title}
                    </a>
                  </div>
                ))}
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReverseImgResult;
