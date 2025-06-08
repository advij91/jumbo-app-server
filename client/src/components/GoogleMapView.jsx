import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const GoogleMapView = ({ latitude = 28.6139, longitude = 77.2090, zoom = 14 }) => {
  const center = { lat: latitude, lng: longitude };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div style={{ width: "100%", height: "200px" }}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          center={center}
          zoom={zoom}
          style={{ width: "100%", height: "100%" }}
        >
          <Marker position={center} />
        </Map>
      </div>
    </APIProvider>
  );
};

export default GoogleMapView;