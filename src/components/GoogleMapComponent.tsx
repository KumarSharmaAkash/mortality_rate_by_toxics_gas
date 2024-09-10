import { GoogleMap, LoadScript, Polygon, Circle, Rectangle, Marker } from '@react-google-maps/api';

interface HighlightedArea {
  center: google.maps.LatLngLiteral;
  radius?: number;
  path?: google.maps.LatLngLiteral[];
  color: string;
}


interface GoogleMapComponentProps {
  longitude: number;
  altitude: number;
  highlightedAreas: HighlightedArea[];
  highlightedRectangles: { bounds: google.maps.LatLngBounds; color: string }[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ longitude, altitude, highlightedAreas, highlightedRectangles }) => {
  const center = { lat: altitude, lng: longitude };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDi3HMfPKhlIcJ4S_F4d1BVg-maGBQBpGM">
      <GoogleMap
        mapContainerStyle={{ height: "600px", width: "1230px" }}
        center={center}
        zoom={12}
      >
        <Marker position={center} />

        {highlightedAreas.map((area, index) =>
          area.path ? (
            <Polygon
              key={index}
              paths={area.path}
              options={{ fillColor: area.color, fillOpacity: 0.5, strokeColor: area.color, strokeOpacity: 1.0, strokeWeight: 2 }}
            />
          ) : (
            <Circle
              key={index}
              center={area.center}
              radius={area.radius}
              options={{ fillColor: area.color, fillOpacity: 0.5, strokeColor: area.color, strokeOpacity: 1.0, strokeWeight: 2 }}
            />
          )
        )}

        {highlightedRectangles.map((rect, index) => (
          <Rectangle
            key={index}
            bounds={rect.bounds}
            options={{ fillColor: rect.color, fillOpacity: 0.5, strokeColor: rect.color, strokeOpacity: 1.0, strokeWeight: 2 }}
          />
        ))}
      </GoogleMap >
    </LoadScript>
  );
};

export default GoogleMapComponent;









