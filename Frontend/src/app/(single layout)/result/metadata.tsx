import React, { useState } from 'react';
import '@/app/(single layout)/result/result.css';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Inter, Montserrat } from 'next/font/google';
import InfoButton from '@/components/button/info_button/info_button';
import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const inter = Inter({ subsets: ['latin'] });
const monstserrat = Montserrat({ subsets: ['latin'] });
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

interface GPSLocation {
  latitude?: string | null;
  longitude?: string | null;
}

interface MetaDataProps {
  cameraInformation?: CameraInformation;
  software_modify?: string;
  modify_date?: string;
  original_date?: OriginalDate;
  author_copyright?: AuthorCopyright;
  gps_location?: GPSLocation;
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

  console.log(gps_location);

  return (
    <div className={`w-full h-full p-5`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="circle_2">
            <BsFillInfoCircleFill />
          </div>
          <div className="font-bold text-lg ml-2">Metadata</div>
        </div>
        <div onClick={openModal} className="focus:outline-none ml-auto">
          <InfoButton></InfoButton>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">Metadata Information</h2>
            {loading ? (
              <div className="p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md flex flex-col items-center gap-4">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 48, color: '#00000' }}
                      spin
                    />
                  }
                />
                <p className="text-gray-700 text-lg font-medium">
                  Loading... Please wait
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex">
                    <div className="circle_2">1.</div>
                    <h3 className="font-bold text-lg">Camera Information</h3>
                  </div>
                  {cameraInformation ? (
                    <>
                      <p>
                        <strong>Make:</strong>{' '}
                        {cameraInformation?.make || 'N/A'}
                      </p>
                      <p>
                        <strong>Model:</strong>{' '}
                        {cameraInformation?.model || 'N/A'}
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
                        <strong>Flash:</strong>{' '}
                        {cameraInformation?.flash || 'N/A'}
                      </p>
                    </>
                  ) : (
                    <p>No camera information available.</p>
                  )}
                </div>

                {/* Software Information Section */}
                <div className="mb-4">
                  <div className="flex">
                    <div className="circle_2">2.</div>
                    <h3 className="font-bold text-lg">Software Information</h3>
                  </div>
                  {software_modify ? (
                    <>
                      <p>
                        <strong>Software Modified:</strong>{' '}
                        {software_modify || 'N/A'}
                      </p>
                      <p>
                        <strong>Modification Date:</strong>{' '}
                        {modify_date || 'N/A'}
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
                        <strong>Author:</strong>{' '}
                        {author_copyright?.author || 'N/A'}
                      </p>
                      <p>
                        <strong>Copyright Tag:</strong>{' '}
                        {author_copyright?.copyright_tag || 'N/A'}
                      </p>
                      <p>
                        <strong>Profile Copyright:</strong>{' '}
                        {author_copyright?.profile_copyright || 'N/A'}
                      </p>
                    </>
                  ) : (
                    <p>No software information available.</p>
                  )}
                </div>

                {/* Geo Tag Section */}
                <div className="mb-4">
                  <div className="flex">
                    <div className="circle_2">3.</div>
                    <h3 className="font-bold text-lg">Geo Tag</h3>
                  </div>
                  {gps_location ? (
                    <div className="gps-location-container">
                      <p>
                        <strong>Latitude:</strong> {gps_location.latitude}
                      </p>
                      <p>
                        <strong>Longitude:</strong> {gps_location.longitude}
                      </p>
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
