import React from 'react';
import "@/app/(single layout)/result/categories.css";

interface MapResProps {
  gps_location?: string | null;
}

const Map_Res: React.FC<MapResProps> = ({ gps_location }) => {
  return (
    <div className='w-full h-full items-center flex-col flex'>
      <div className='image-title-container'> GPS Location</div>
      {gps_location ? (
        <div className="gps-location-container">
          <p>{gps_location}</p>
        </div>
      ) : (
        <p>No GPS location available.</p>
      )}
    </div>
  );
}

export default Map_Res;
