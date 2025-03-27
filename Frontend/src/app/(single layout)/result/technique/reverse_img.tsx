import React, { useState } from 'react';
import { SearchResult } from '@/interface/interface';
import { IoIosReverseCamera } from 'react-icons/io';
import { Inter } from 'next/font/google';
import InfoButton from '@/components/button/info_button/info_button';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const inter = Inter({ subsets: ['latin'] });
interface ReverseImgProp {
  searchResult: SearchResult[] | null;
  loading: boolean;
}
const testResult = [
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
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex">
          <div className="circle_2">
            <IoIosReverseCamera />
          </div>
          <div className="font-bold text-lg ml-2">Reversed Search</div>
        </div>

        <div onClick={openModal} className="focus:outline-none ml-auto">
          <InfoButton />
        </div>
      </div>

      {/* Top 3 Results */}
      {loading ? (
        <></>
      ) : searchResult?.length !== 0 ? (
        <div className="mt-4">
          <h3 className="font-semibold mb-2 border rounded-md p-2 w-fit">
            Top Results
          </h3>
          {searchResult?.splice(0, 3).map((result, index) => (
            <div key={index} className="mb-2">
              <a href={result.redirect_link} className="hover:underline">
                {index + 1}. {result.title}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}

      {/* Modal for Viewing All Results */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Reversed Link Search</h2>
            {loading ? (
              // Spinner Section
              <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md flex flex-col items-center gap-4">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 48, color: '00000' }}
                      spin
                    />
                  }
                />
                <p className="text-gray-700 text-lg font-medium">
                  Searching... Please wait
                </p>
              </div>
            ) : searchResult?.length !== 0 ? (
              // Results Section
              <>
                {searchResult?.map((result, index) => (
                  <div key={index} className="mb-2">
                    <a href={result.redirect_link} className="hover:underline">
                      {index + 1}. {result.title}
                    </a>
                  </div>
                ))}
              </>
            ) : (
              // No Results Section
              <div>No results found</div>
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
