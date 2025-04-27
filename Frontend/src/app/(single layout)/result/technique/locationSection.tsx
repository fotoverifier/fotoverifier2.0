import MapComponent from '@/components/map/map';
import { useState } from 'react';
import { FiMapPin, FiCompass, FiNavigation2, FiMap } from 'react-icons/fi';
import { ExifData } from '@/interface/interface';
import { useLanguage } from '@/context/LanguageContext';

const LocationSection = ({ exifResult }: { exifResult: ExifData | null }) => {
  const [activeTab, setActiveTab] = useState('map');
  const {t} = useLanguage();
    const tabData = [
    {
      id: 'map',
      name: t('location_Tagging.tab.mapView'),
      icon: FiMap,
      colorClasses: {
        active: 'bg-teal-800 text-white shadow-md',
        inactive: 'bg-white text-teal-800 hover:bg-teal-50',
      },
    },
    {
      id: 'analysis',
      name: t('location_Tagging.tab.analysis'),
      icon: FiCompass,
      colorClasses: {
        active: 'bg-yellow-500 text-white shadow-md',
        inactive: 'bg-white text-teal-800 hover:bg-yellow-50',
      },
    },
  ];

  const analysisData = [
    {
      title: t('location_Tagging.analysisData.exifAnalysis.title'),
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-500',
      titleColor: 'text-teal-800',
      content: exifResult?.gps_location
        ? t('location_Tagging.analysisData.exifAnalysis.locationFound')
        : t('location_Tagging.analysisData.exifAnalysis.noLocation'),
    },
    {
      title: t('location_Tagging.analysisData.visualAnalysis.title'),
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      titleColor: 'text-yellow-800',
      content: `${t('location_Tagging.analysisData.visualAnalysis.title')} ${
        exifResult?.gps_location
          ? t('location_Tagging.analysisData.visualAnalysis.consistentLocation')
          : t('location_Tagging.analysisData.visualAnalysis.multipleLocations')
      }`,
    },
    {
      title: t('location_Tagging.analysisData.crossReference.title'),
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-400',
      titleColor: 'text-gray-800',
      content: t('location_Tagging.analysisData.crossReference.description'),
    },
  ];

  const detectionMethods = [
    {
      title: t('location_Tagging.detectionMethods.exifExtraction.title'),
      description: t('location_Tagging.detectionMethods.exifExtraction.description'),
    },
    {
      title: t('location_Tagging.detectionMethods.visualFeature.title'),
      description: t('location_Tagging.detectionMethods.visualFeature.description'),
    },
    {
      title: t('location_Tagging.detectionMethods.neuralNetwork.title'),
      description: t('location_Tagging.detectionMethods.neuralNetwork.description'),
    },
  ];

  const renderMainContent = () => {
    if (activeTab === 'map') {
      return (
        <div className="w-full md:w-2/3 h-[90%] bg-gray-100 rounded-lg overflow-hidden">
          <div className="h-full w-full relative">
            <MapComponent
              coordinate={[
                Number(exifResult?.gps_location?.latitude),
                Number(exifResult?.gps_location?.longitude),
              ]}
            />
            <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 px-3 py-2 rounded-md shadow-sm text-base font-mono text-teal-800">
              {exifResult?.gps_location ? (
                <>
                  <span className="font-bold">GPS:</span>{' '}
                  {exifResult.gps_location.latitude},{' '}
                  {exifResult.gps_location.longitude}
                </>
              ) : (
               t('No_GPS_Location_Available')
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-[90%] md:w-2/3 bg-white rounded-lg shadow-md p-4 flex flex-col justify-evenly">
          <h3 className="font-semibold text-teal-800 mb-2">
            {t('location_Tagging.detectionResults')}
          </h3>
          <div className="flex-1 overflow-auto">
            <div className="space-y-3">
              {analysisData.map((item, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${item.bgColor} border-l-4 ${item.borderColor}`}
                >
                  <div className={`font-medium ${item.titleColor}`}>
                    {item.title}
                  </div>
                  <div className="text-base text-gray-600">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-50 to-yellow-50 p-4 rounded-xl shadow-lg border">
      <div className="flex space-x-2 mb-4 h-[10%]">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-base font-medium flex items-center ${
              activeTab === tab.id
                ? tab.colorClasses.active
                : tab.colorClasses.inactive
            }`}
          >
            <tab.icon className="mr-2" size={16} />
            {tab.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row h-[90%] gap-4">
        {renderMainContent()}

        <div className="w-full h-[90%] md:w-1/3 bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-teal-800 mb-3 flex items-center">
            <FiNavigation2 className="mr-2 text-yellow-500" size={20} />
            {t('location_Tagging.detectionMethods')}
          </h3>

          <ul className="space-y-3 text-base">
            {detectionMethods.map((method, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-0.5 flex items-center justify-center bg-yellow-400 text-teal-800 rounded-full w-5 h-5 text-xs">
                  {index + 1}
                </div>
                <div>
                  <span className="font-medium text-teal-800">
                    {method.title}
                  </span>
                  <p className="text-gray-600 text-xs mt-0.5">
                    {method.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>


        </div>
      </div>
    </div>
  );
};

export default LocationSection;
