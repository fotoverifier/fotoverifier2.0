import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import '@/app/(single layout)/result/result.css';

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
}

const MetaDataPage: React.FC<MetaDataProps> = ({
  cameraInformation,
  software_modify,
  modify_date,
  original_date,
  author_copyright,
  gps_location,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full h-full p-5">
      <div className="flex-col items-center justify-between">
        <div className="flex items-center">
          <div className="circle_2"> 4. </div>
          <div className="font-bold text-lg ml-2">Metadata</div>

          <button onClick={openModal} className="focus:outline-none ml-auto">
            <div className="flex justify-center rounded-md border-black border-2 p-2 hover:bg-black hover:text-white">
              Show Detail
            </div>
          </button>
        </div>
        <div className="flex items-center">
          <div className="circle_2"> 5. </div>
          <div className="font-bold text-lg ml-2"> The Geo Map</div>
        </div>
      </div>
      {/* Modal for displaying all metadata information */}
      {isModalOpen &&
        (!cameraInformation &&
        !software_modify &&
        !modify_date &&
        !original_date &&
        !author_copyright &&
        !gps_location ? (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 max-w-lg p-6">
              <h2 className="text-xl font-bold mb-4">Metadata Information</h2>
              <p>No metadata information available.</p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-11/12 max-w-lg p-6">
              <h2 className="text-xl font-bold mb-4">Metadata Information</h2>

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
                  <strong>Software Modified:</strong> {software_modify || 'N/A'}
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

              <div className="mb-4">
                <div className="flex">
                  <div className="circle_2"> 3. </div>
                  <h3 className="font-bold text-lg"> Geo Tag</h3>
                </div>
                {gps_location ? (
                  <div className="gps-location-container">
                    <p>{gps_location}</p>
                  </div>
                ) : (
                  <p>No GPS location available.</p>
                )}
              </div>

              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white p-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      ;
    </div>
  );
};

export default MetaDataPage;
