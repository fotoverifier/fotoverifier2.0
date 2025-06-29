import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useLanguage } from '@/context/LanguageContext';

const DefaultIcon = L.icon({
  iconUrl: typeof markerIcon === 'string' ? markerIcon : markerIcon.src,
  shadowUrl:
    typeof markerIconShadow === 'string'
      ? markerIconShadow
      : markerIconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  coordinate: [number, number];
}

const MapComponent: React.FC<MapComponentProps> = ({ coordinate }) => {
  const {t} = useLanguage();
  const isValidCoordinate = (coordinate: [number, number]) => {
    return (
      Array.isArray(coordinate) &&
      coordinate.length === 2 &&
      typeof coordinate[0] === 'number' &&
      typeof coordinate[1] === 'number' &&
      !isNaN(coordinate[0]) &&
      !isNaN(coordinate[1])
    );
  };
  if (!isValidCoordinate(coordinate)) {
    return <div> {t('No_GPS_Location_Available')} </div>;
  }
  return (
    <div className="h-full w-full">
      {}
      <MapContainer
        center={coordinate}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        key={coordinate.toString()}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinate}>
          <Popup>
            Location: {coordinate[0]}, {coordinate[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
