import React, { useState } from 'react';
import '@/app/(single layout)/result/technique/result.css';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();
  console.log(gps_location);

  return (
    <div className={`w-full h-full p-5`}>
      <div className="flex items-center justify-between" onClick={openModal}>
        <div className="flex items-center">
          <div className="circle_2">
            <BsFillInfoCircleFill />
          </div>
          <div className="font-bold text-lg ml-2">Metadata</div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 max-w-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              {t('Metadata_Information')}
            </h2>

            {loading ? (
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-inner">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 48, color: '#000000' }}
                      spin
                    />
                  }
                />
                <p className="text-gray-700 text-lg font-semibold">
                  {t('Loading_Please_Wait')}
                </p>
              </div>
            ) : (
              <>
                {/* Camera Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="circle_2 text-sm font-bold text-white bg-teal-600 w-6 h-6 rounded-full flex items-center justify-center">
                      1
                    </div>
                    <h3 className="font-bold text-lg text-gray-700">
                      {t('Camera_Information')}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 pl-9">
                    <p>
                      <strong>{t('Make')}:</strong>{' '}
                      {cameraInformation?.make || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Model')}:</strong>{' '}
                      {cameraInformation?.model || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Exposure')}:</strong>{' '}
                      {cameraInformation?.exposure || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Aperture')}:</strong>{' '}
                      {cameraInformation?.aperture || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Focal_Length')}:</strong>{' '}
                      {cameraInformation?.focal_length || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('ISO_Speed')}:</strong>{' '}
                      {cameraInformation?.iso_speed || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Flash')}:</strong>{' '}
                      {cameraInformation?.flash || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Software Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="circle_2 text-sm font-bold text-white bg-teal-600 w-6 h-6 rounded-full flex items-center justify-center">
                      2
                    </div>
                    <h3 className="font-bold text-lg text-gray-700">
                      {t('Software_Information')}
                    </h3>
                  </div>
                  <div className="text-sm text-gray-700 space-y-1 pl-9">
                    <p>
                      <strong>{t('Software_Modified')}:</strong>{' '}
                      {software_modify || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Modification_Date')}:</strong>{' '}
                      {modify_date || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Original_Date')}:</strong>{' '}
                      {original_date?.original_date || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Create_Date')}:</strong>{' '}
                      {original_date?.create_date || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Author')}:</strong>{' '}
                      {author_copyright?.author || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Copyright_Tag')}:</strong>{' '}
                      {author_copyright?.copyright_tag || 'N/A'}
                    </p>
                    <p>
                      <strong>{t('Profile_Copyright')}:</strong>{' '}
                      {author_copyright?.profile_copyright || 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Geo Tag */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="circle_2 text-sm font-bold text-white bg-teal-600 w-6 h-6 rounded-full flex items-center justify-center">
                      3
                    </div>
                    <h3 className="font-bold text-lg text-gray-700">
                      {t('Geo_Tag')}
                    </h3>
                  </div>
                  {gps_location ? (
                    <div className="text-sm text-gray-700 space-y-1 pl-9">
                      <p>
                        <strong>{t('Latitude')}</strong> {gps_location.latitude}
                      </p>
                      <p>
                        <strong>{t('Longitude')}</strong>{' '}
                        {gps_location.longitude}
                      </p>
                    </div>
                  ) : (
                    <p className="pl-9 text-sm text-gray-500">
                      {t('No_GPS_Location_Available')}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetaDataPage;
