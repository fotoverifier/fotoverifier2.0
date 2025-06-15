import { useLanguage } from '@/context/LanguageContext';
import React from 'react';
import { IoIosPricetag } from 'react-icons/io';
interface TagResultProps {
  Tag: string | null; // Accept the image as a prop
  loading: boolean;
}

const ImgTagging_Result: React.FC<TagResultProps> = ({ Tag, loading }) => {
  const tags = Tag ? Tag.split('|') : [];
  const { t } = useLanguage();
  const sampleTag =
    'Nature|Animals|Landscape|Sunset|Water|Mountains|Sky|Beach|Forest';
  return (
    <div className="striped-background w-full h-full">
      <div className="flex items-center mb-3">
        <div className="flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-10 h-10 shadow-sm">
          <IoIosPricetag size={18} />
        </div>
        <h3 className="font-bold text-lg ml-3 text-teal-800">
          {' '}
          {t('image_Tags.title')}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4 overflow-auto scrollbar-hide">
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
