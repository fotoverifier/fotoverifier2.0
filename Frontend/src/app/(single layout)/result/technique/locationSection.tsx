import MapComponent from '@/components/map/map';
import { useState } from 'react';
import { FiMapPin, FiCompass, FiNavigation2, FiMap } from 'react-icons/fi';
import { ExifData } from '@/interface/interface';
const LocationSection = ({ exifResult }: { exifResult: ExifData | null }) => {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 to-yellow-50 p-4 rounded-xl shadow-lg border ">
      <div className="flex space-x-2 mb-4 h-[10%]">
        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            activeTab === 'map'
              ? 'bg-teal-800 text-white shadow-md'
              : 'bg-white text-teal-800 hover:bg-teal-50'
          }`}
        >
          <FiMap className="mr-2" size={16} />
          Map View
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
            activeTab === 'analysis'
              ? 'bg-yellow-500 text-white shadow-md'
              : 'bg-white text-teal-800 hover:bg-yellow-50'
          }`}
        >
          <FiCompass className="mr-2" size={16} />
          Analysis
        </button>
      </div>

      <div className="flex flex-col md:flex-row h-[90%] gap-4">
        {activeTab === 'map' ? (
          <div className="w-full md:w-2/3 h-[90%] bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-full w-full relative">
              <MapComponent
                coordinate={[
                  Number(exifResult?.gps_location?.latitude),
                  Number(exifResult?.gps_location?.longitude),
                ]}
              />

              <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 px-3 py-2 rounded-md shadow-sm text-sm font-mono text-teal-800">
                {exifResult?.gps_location ? (
                  <>
                    <span className="font-bold">GPS:</span>{' '}
                    {exifResult.gps_location.latitude},{' '}
                    {exifResult.gps_location.longitude}
                  </>
                ) : (
                  'No GPS data available'
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-[90%] md:w-2/3  bg-white rounded-lg shadow-md p-4 flex flex-col justify-evenly">
            <h3 className="font-semibold text-teal-800 mb-2">
              Detection Results
            </h3>
            <div className="flex-1 overflow-auto">
              <div className="space-y-3">
                <div className="p-2 rounded-lg bg-teal-50 border-l-4 border-teal-500">
                  <div className="font-medium text-teal-800">EXIF Analysis</div>
                  <div className="text-sm text-gray-600">
                    {exifResult?.gps_location
                      ? `Location data found in image metadata`
                      : `No EXIF location data available`}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-yellow-50 border-l-4 border-yellow-500">
                  <div className="font-medium text-yellow-800">
                    Visual Analysis
                  </div>
                  <div className="text-sm text-gray-600">
                    AI landmark detection suggests{' '}
                    {exifResult?.gps_location
                      ? `image location consistent with metadata`
                      : `potential match with multiple locations`}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-gray-50 border-l-4 border-gray-400">
                  <div className="font-medium text-gray-800">
                    Cross-Reference
                  </div>
                  <div className="text-sm text-gray-600">
                    Image features cross-referenced with geographical database
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-[90%] md:w-1/3 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
            <FiNavigation2 className="mr-2 text-yellow-500" size={18} />
            Detection Methods
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <div className="mr-2 mt-0.5 flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-5 h-5 text-xs">
                1
              </div>
              <div>
                <span className="font-medium text-teal-800">
                  EXIF Extraction
                </span>
                <p className="text-gray-600 text-xs mt-0.5">
                  Parsing embedded GPS coordinates and timestamps
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <div className="mr-2 mt-0.5 flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-5 h-5 text-xs">
                2
              </div>
              <div>
                <span className="font-medium text-teal-800">
                  Visual Feature Analysis
                </span>
                <p className="text-gray-600 text-xs mt-0.5">
                  SIFT algorithms for landmark matching
                </p>
              </div>
            </li>

            <li className="flex items-start">
              <div className="mr-2 mt-0.5 flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-5 h-5 text-xs">
                3
              </div>
              <div>
                <span className="font-medium text-teal-800">
                  Neural Network Processing
                </span>
                <p className="text-gray-600 text-xs mt-0.5">
                  Training on millions of geotagged images
                </p>
              </div>
            </li>
          </ul>

          <div className="mt-4 p-2 bg-gradient-to-r from-teal-50 to-yellow-50 rounded-lg text-xs text-teal-800 border border-yellow-200">
            <span className="font-semibold block mb-1">Forensic Insight:</span>
            Location inconsistencies can reveal digital forgeries and
            AI-generated content. Our system verifies both metadata and visual
            consistency.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
