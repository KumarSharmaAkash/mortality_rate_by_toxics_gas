import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Circle, Polygon, Marker } from '@react-google-maps/api';

const center = { lat: 37.7749, lng: -122.4194 };

interface GoogleMapComponentProps {
  longitude: number;
  altitude: number;
  highlightedAreas: { center: google.maps.LatLngLiteral; radius?: number; path?: google.maps.LatLngLiteral[]; color: string }[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ longitude, altitude, highlightedAreas }) => {
  const googleMapsApiKey = "AIzaSyDi3HMfPKhlIcJ4S_F4d1BVg-maGBQBpGM";

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey!,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  useEffect(() => {
    if (isLoaded && map && highlightedAreas.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      highlightedAreas.forEach(({ center }) => {
        bounds.extend(center);
      });
      map.fitBounds(bounds);
    }
  }, [isLoaded, map, highlightedAreas]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '450px' }}
      center={center}
      zoom={10}
      onLoad={onLoad}
    >
      <Marker position={{ lat: altitude, lng: longitude }} />
      {highlightedAreas.map((highlightedArea, index) =>
        highlightedArea.radius ? (
          <Circle
            key={index}
            center={highlightedArea.center}
            radius={highlightedArea.radius}
            options={{
              fillColor: highlightedArea.color,
              fillOpacity: 0.4,
              strokeColor: highlightedArea.color,
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        ) : (
          <Polygon
            key={index}
            paths={highlightedArea.path!}
            options={{
              fillColor: highlightedArea.color,
              fillOpacity: 0.4,
              strokeColor: highlightedArea.color,
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        )
      )}
    </GoogleMap>
  ) : <></>;
};

export default GoogleMapComponent;
