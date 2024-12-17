import React, { useState } from 'react';
import Image from 'next/image';
import { SearchResult } from '@/interface/interface';
import { IoIosReverseCamera } from 'react-icons/io';
import { Inter } from 'next/font/google';
import InfoButton from '@/components/button/info_button/info_button';
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
       <InfoButton></InfoButton>
        </div>
      </div>
    

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
