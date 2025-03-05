import React from 'react';
import Image from 'next/image';
import { IoIosPricetag } from 'react-icons/io';
import { Flex, Spin, Tabs } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
interface TagResultProps {
  Tag: string | null; // Accept the image as a prop
  loading: boolean;
}

const ImgTagging_Result: React.FC<TagResultProps> = ({ Tag, loading }) => {
  const tags = Tag ? Tag.split('|') : [];
  const sampleTag =
    'Nature|Animals|Landscape|Sunset|Water|Mountains|Sky|Beach|Forest';
  const sampleTagsplit = sampleTag ? sampleTag.split('|') : [];
  return (
    <div className="striped-background w-full h-full p-5">
      <div className="flex">
        <div className="circle_2">
          {' '}
          <IoIosPricetag />{' '}
        </div>
        <div className="font-bold text-lg ml-2 mb-5">Image Tagging</div>
      </div>
      {/* <div className="grid grid-cols-3 gap-2 overflow-auto max-h-[300px]">
        {sampleTagsplit.map((tag, index) => (
          <div
            key={index}
            className="flex items-center justify-center bg-gray-200 text-gray-800 font-semibold rounded-md p-2"
          >
            {tag}
          </div>
        ))}
       </div> */}

        <div className="grid grid-cols-3 gap-4 overflow-auto max-h-40">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-gray-200 text-gray-800 font-semibold rounded-md p-2"
            >
              {tag}
            </div>
          ))}
        </div>
    
    </div>
  );
};

export default ImgTagging_Result;
