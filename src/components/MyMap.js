import React from "react";
import { Map, Marker } from "pigeon-maps";
export function MyMap({ lat, lon }) {
  return (
    <Map
      height={300}
      defaultCenter={[parseFloat(lat), parseFloat(lon)]}
      defaultZoom={11}
    >
      <Marker width={50} anchor={[parseFloat(lat), parseFloat(lon)]} />
    </Map>
  );
}
export default MyMap;
