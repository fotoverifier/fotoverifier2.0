import React from 'react';
import '@/app/(single layout)/result/categories.css';

interface MapResProps {
  gps_location?: string | null;
}

const Map_Res: React.FC<MapResProps> = ({ gps_location }) => {
  return (
    <div className="w-full h-full p-5">
      <div className="flex">
        <div className="circle_2"> 4. </div>
        <div className="font-bold text-lg ml-2 border-black border-b-2">
          GPS Location
        </div>
      </div>
      {gps_location ? (
        <div className="gps-location-container">
          <p>{gps_location}</p>
        </div>
      ) : (
        <p>No GPS location available.</p>
      )}
    </div>
  );
};

export default Map_Res;
