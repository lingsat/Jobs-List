import { FC } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { mapStyles } from "./mapStyles";

interface MapProps {
  lat: number;
  lng: number;
}

const Map: FC<MapProps> = ({ lat, lng }) => {
  return (
    <LoadScript
      language="en"
      region="EN"
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY!}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "111%" }}
        // center={{ lat, lng }}
        center={{ lat: 48.22140057390992, lng: 16.348647086855475 }}
        zoom={13}
        options={{
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: mapStyles,
        }}
      >
        <Marker
          // position={{ lat, lng }}
          position={{ lat: 48.22140057390992, lng: 16.348647086855475 }}
          icon="../assets/images/Marker.svg"
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
