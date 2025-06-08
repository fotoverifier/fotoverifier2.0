import React from 'react';
import Image from 'next/image';
import { FaCamera, FaUser } from 'react-icons/fa';
// import ReverseImgResult from './ReverseImgResult'; // if needed
import unknown_author from '@/assets/unknown_author.jpg'; // adjust path
import { useLanguage } from '@/context/LanguageContext';
import ImgTagging_Result from './technique/osm_tags';

interface ExifImageDetailsProps {
  exifResult: any;
  tagResult: any;
  loadingTagResult: boolean;
  // SearchResult?: any;
  // loadingReverseImageSearch?: boolean;
}

const ExifImageDetails: React.FC<ExifImageDetailsProps> = ({
  exifResult,
  tagResult,
  loadingTagResult,
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 bg-yellow-50 p-6 rounded-xl">
      {/* Camera Area */}
      <div className="w-full md:w-1/3 h-full flex flex-col gap-4" id="CameraArea">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center mb-3">
            <div className="flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-10 h-10 shadow-sm">
              <FaCamera size={18} />
            </div>
            <h3 className="font-bold text-lg ml-3 text-teal-800">
              {t('Camera_Information')}
            </h3>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-center bg-gray-50 h-64">
            <Image
              src={
                exifResult?.camera_information?.camera_image?.image_url ||
                unknown_author
              }
              alt="Camera Image"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">{t('Make')}:</div>
            <div className="font-bold text-teal-800">
              {exifResult?.camera_information?.make || 'Unknown'}
            </div>

            <div className="text-gray-500">{t('Model')}:</div>
            <div className="font-bold text-teal-800">
              {exifResult?.camera_information?.model || 'Unknown'}
            </div>

            <div className="text-gray-500">{t('Software_Modified')}:</div>
            <div className="font-bold text-teal-800">
              {exifResult?.software_modify?.replace(
                /^Image edited with:\s*/i,
                ''
              ) || 'Unknown'}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 h-full flex flex-col gap-4" id="AuthorArea">
        <div className="bg-white rounded-xl shadow-sm p-4 flex-grow">
          <div className="flex items-center mb-3">
            <div className="flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-10 h-10 shadow-sm">
              <FaUser size={18} />
            </div>
            <h3 className="font-bold text-lg ml-3 text-teal-800">
              {t('Author_Information')}
            </h3>
          </div>

          <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-center bg-gray-50 h-64">
            <Image
              src={
                exifResult?.author_copyright?.author_image?.image_results?.[0]
                  .original || unknown_author
              }
              alt="Author Image"
              width={180}
              height={180}
              className="object-contain"
            />
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <div className="text-sm">
              <span className="font-medium text-teal-800">
                {t('Copyright_Tag')}:{' '}
              </span>
              <span className="text-gray-700">
                {exifResult?.author_copyright?.profile_copyright ||
                  'Not specified'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/3 flex flex-col gap-4">
        {/* <div className="bg-white rounded-xl shadow-sm p-4 flex-1" id="ReversedImg">
          <ReverseImgResult searchResult={SearchResult} loading={loadingReverseImageSearch} />
        </div> */}

        <div className="bg-white rounded-xl shadow-sm p-4 flex-1" id="ImgTagging">
          <ImgTagging_Result Tag={tagResult} loading={loadingTagResult} />
        </div>
      </div>
    </div>
  );
};

export default ExifImageDetails;
