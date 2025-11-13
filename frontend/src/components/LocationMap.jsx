import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function LocationMap({ lat, lng, address }) {
  if (!lat || !lng) {
    return (
      <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Location will appear here</p>
      </div>
    );
  }

  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={15} 
      scrollWheelZoom={false}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <div className="text-sm">
            <p className="font-medium">Your Location</p>
            <p className="text-muted-foreground">{address || 'Loading address...'}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}