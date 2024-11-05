import React from 'react';
import "@/app/(single layout)/result/result.css"
// Define the props type for the MetaData_Result component
interface CameraInformation {
  make: string | undefined;
  model: string | undefined;
  exposure: string | undefined;
  aperture: string | undefined;
  focal_length: string | undefined;
  iso_speed: string | undefined;
  flash: string | undefined;
}

interface MetaDataProps {
  cameraInformation: CameraInformation | undefined; // Accept camera information as a prop
}

const MetaData_Result: React.FC<MetaDataProps> = ({ cameraInformation }) => {
  return (
    <div className='w-full h-full p-5'>
      <div className='flex align-middle'>
      <div className='circle_2'> 2. </div>
      <div className=' font-bold text-lg ml-2 mb-5'>Metadata</div>
      </div>
     <div>
  <p><strong>Make:</strong> {cameraInformation?.make || 'N/A'}</p>
  <p><strong>Model:</strong> {cameraInformation?.model || 'N/A'}</p>
  <p><strong>Exposure:</strong> {cameraInformation?.exposure || 'N/A'}</p>
  <p><strong>Aperture:</strong> {cameraInformation?.aperture || 'N/A'}</p>
  <p><strong>Focal Length:</strong> {cameraInformation?.focal_length || 'N/A'}</p>
  <p><strong>ISO Speed:</strong> {cameraInformation?.iso_speed || 'N/A'}</p>
  <p><strong>Flash:</strong> {cameraInformation?.flash || 'N/A'}</p>
</div>
    </div>
  );
}

export default MetaData_Result;
