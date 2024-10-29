import React from 'react';

// Define the props type for the MetaData_Result component
interface CameraInformation {
  make: string;
  model: string;
  exposure: string;
  aperture: string;
  focal_length: string;
  iso_speed: string;
  flash: string;
}

interface MetaDataProps {
  cameraInformation: CameraInformation | null; // Accept camera information as a prop
}

const MetaData_Result: React.FC<MetaDataProps> = ({ cameraInformation }) => {
  return (
    <div className='w-full h-full'>
      <div className='image-title-container'>Metadata</div>
      {cameraInformation && (
        <div>
          <p><strong>Make:</strong> {cameraInformation.make}</p>
          <p><strong>Model:</strong> {cameraInformation.model}</p>
          <p><strong>Exposure:</strong> {cameraInformation.exposure}</p>
          <p><strong>Aperture:</strong> {cameraInformation.aperture}</p>
          <p><strong>Focal Length:</strong> {cameraInformation.focal_length}</p>
          <p><strong>ISO Speed:</strong> {cameraInformation.iso_speed}</p>
          <p><strong>Flash:</strong> {cameraInformation.flash}</p>
        </div>
      )}
    </div>
  );
}

export default MetaData_Result;
