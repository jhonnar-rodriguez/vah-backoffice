import { FC } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { IAddressCoords } from "../../contracts/general/address/IAddress";
import { GOOGLE_MAP_KEY } from "../../../config/app";

type MapContainerProps = {
  label: string,
  coords: IAddressCoords,
}

const MapContainer: FC<MapContainerProps> = ({ coords, label }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAP_KEY,
  });

  const { latitude: lat, longitude: lng } = coords;

  const mapStyles = {
    width: "100%",
    height: "50vh",
  };

  return isLoaded ? (
    <GoogleMap
      id="address-map"
      zoom={18}
      center={{ lat, lng }}
      mapContainerStyle={mapStyles}
    >
      <Marker
        position={{ lat, lng }}
        clickable={false}
        draggable={true}
        label={label}
      />
    </GoogleMap>
  ) : <></>
}

export default MapContainer;
