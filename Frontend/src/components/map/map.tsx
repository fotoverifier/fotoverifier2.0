import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for marker icons (optional, resolves default icon issues)
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: typeof markerIcon === 'string' ? markerIcon : markerIcon.src,
  shadowUrl:
    typeof markerIconShadow === 'string'
      ? markerIconShadow
      : markerIconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Define props interface
interface MapComponentProps {
  coordinate: [number, number]; // Accepts a tuple with latitude and longitude
}

const MapComponent: React.FC<MapComponentProps> = ({ coordinate }) => {
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
    return <div>No geolocation found.</div>;
  }
  return (
    <div className="h-full w-full">
      {/* Use key to ensure the map is re-initialized when coordinates change */}
      <MapContainer
        center={coordinate}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        key={coordinate.toString()} // Use coordinate as key
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
