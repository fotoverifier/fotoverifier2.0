import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import '@/app/(single layout)/result/result.css';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Inter, Montserrat } from 'next/font/google';

const inter = Inter({subsets: ["latin"]});
const monstserrat = Montserrat({subsets: ["latin"]});
interface CameraInformation {
  make: string | undefined;
  model: string | undefined;
  exposure: string | undefined;
  aperture: string | undefined;
  focal_length: string | undefined;
  iso_speed: string | undefined;
  flash: string | undefined;
}

interface OriginalDate {
  original_date: string | undefined;
  create_date: string | undefined;
}

interface AuthorCopyright {
  author?: string | null;
  copyright_tag?: string | null;
  profile_copyright?: string | null;
}

interface MetaDataProps {
  cameraInformation?: CameraInformation;
  software_modify?: string;
  modify_date?: string;
  original_date?: OriginalDate;
  author_copyright?: AuthorCopyright;
  gps_location?: string;
  loading: boolean;
}

const MetaDataPage: React.FC<MetaDataProps> = ({
  cameraInformation,
  software_modify,
  modify_date,
  original_date,
  author_copyright,
  gps_location,
  loading,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`w-full h-full p-5 ${inter.className}`}>
      <div className="flex-col items-center justify-between">
        <div className="flex items-center">
          <div className="circle_2"> <BsFillInfoCircleFill /></div>
          <div className="font-bold text-lg ml-2">Metadata</div>

          <div onClick={openModal} className="focus:outline-none ml-auto">
           <button className="button">
          <svg viewBox="0 0 448 512" className="svgIcon"><path d="M290.671,135.434c37.324-3.263,64.949-36.175,61.663-73.498c-3.241-37.324-36.152-64.938-73.476-61.675
              c-37.324,3.264-64.949,36.164-61.686,73.488C220.437,111.096,253.348,138.698,290.671,135.434z"/>
            <path d="M311.31,406.354c-16.134,5.906-43.322,22.546-43.322,22.546s20.615-95.297,21.466-99.446
              c8.71-41.829,33.463-100.86-0.069-136.747c-23.35-24.936-53.366-18.225-79.819,7.079c-17.467,16.696-26.729,27.372-42.908,45.322
              c-6.55,7.273-9.032,14.065-5.93,24.717c3.332,11.515,16.8,17.226,28.705,12.871c16.134-5.895,43.3-22.534,43.3-22.534
              s-12.595,57.997-18.869,87c-0.874,4.137-36.06,113.292-2.505,149.18c23.35,24.949,53.343,18.226,79.819-7.066
              c17.467-16.698,26.729-27.373,42.908-45.334c6.55-7.263,9.009-14.054,5.93-24.706C336.66,407.733,323.215,402.01,311.31,406.354z"
              />
          </svg>
        </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Metadata Information</h2>
            {loading ? (
              <p>Loading...</p>
            ) :  (
              <>
                {/* Metadata Section */}
                <div className="mb-4">
                  <div className="flex">
                    <div className="circle_2"> 1. </div>
                    <h3 className="font-bold text-lg">Camera Information</h3>
                  </div>
                  <p>
                    <strong>Make:</strong> {cameraInformation?.make || 'N/A'}
                  </p>
                  <p>
                    <strong>Model:</strong> {cameraInformation?.model || 'N/A'}
                  </p>
                  <p>
                    <strong>Exposure:</strong>{' '}
                    {cameraInformation?.exposure || 'N/A'}
                  </p>
                  <p>
                    <strong>Aperture:</strong>{' '}
                    {cameraInformation?.aperture || 'N/A'}
                  </p>
                  <p>
                    <strong>Focal Length:</strong>{' '}
                    {cameraInformation?.focal_length || 'N/A'}
                  </p>
                  <p>
                    <strong>ISO Speed:</strong>{' '}
                    {cameraInformation?.iso_speed || 'N/A'}
                  </p>
                  <p>
                    <strong>Flash:</strong> {cameraInformation?.flash || 'N/A'}
                  </p>
                </div>

                {/* Software Information Section */}
                <div className="mb-4">
                  <div className="flex">
                    <div className="circle_2"> 2. </div>
                    <h3 className="font-bold text-lg">Software Information</h3>
                  </div>
                  <p>
                    <strong>Software Modified:</strong>{' '}
                    {software_modify || 'N/A'}
                  </p>
                  <p>
                    <strong>Modification Date:</strong> {modify_date || 'N/A'}
                  </p>
                  <p>
                    <strong>Original Date:</strong>{' '}
                    {original_date?.original_date || 'N/A'}
                  </p>
                  <p>
                    <strong>Create Date:</strong>{' '}
                    {original_date?.create_date || 'N/A'}
                  </p>
                  <p>
                    <strong>Author:</strong> {author_copyright?.author || 'N/A'}
                  </p>
                  <p>
                    <strong>Copyright Tag:</strong>{' '}
                    {author_copyright?.copyright_tag || 'N/A'}
                  </p>
                  <p>
                    <strong>Profile Copyright:</strong>{' '}
                    {author_copyright?.profile_copyright || 'N/A'}
                  </p>
                </div>

                {/* Geo Tag Section */}
                <div className="mb-4">
                  <div className="flex">
                    <div className="circle_2"> 3. </div>
                    <h3 className="font-bold text-lg">Geo Tag</h3>
                  </div>
                  {gps_location ? (
                    <div className="gps-location-container">
                      <p>{gps_location}</p>
                    </div>
                  ) : (
                    <p>No GPS location available.</p>
                  )}
                </div>
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

export default MetaDataPage;
