// import React, { useRef, useEffect } from "react";

// import "./Map.css";

// const Map = (props) => {
//   const mapRef = useRef();

//   const { center, zoom } = props; // scoate valorile lor din props si le stocheaza in noi constante pe care le putem folosii local

//   useEffect(() => {
//     const map = new window.google.maps.Map(mapRef.current, {
//       center: center,
//       zoom: zoom,
//     });

//     new window.google.maps.Marker({ position: center, map: map });
//   }, [center, zoom]);

//   return (
//     <div
//       ref={mapRef}
//       className={`map ${props.className}`}
//       style={props.style}
//       id="map"
//     ></div>
//   );
// };
///////////////////////////////////////////////////////////
// import React from "react";
// import "./Map.css";
// import { GoogleMap, Marker } from "@react-google-maps/api";

// const Map = (props) => {
//   return (
//     <GoogleMap
//       zoom={10}
//       center={{ lat: 44, lng: -80 }}
//       className={`map ${props.className}`}
//     ></GoogleMap>
//   );
// };
///////////////////////////////////////////////////////////

// import React, { useRef, useEffect } from 'react';

// import './Map.css';

// const Map = props => {
//   const mapRef = useRef();

//   const { center, zoom } = props;

//   useEffect(() => {
//     new window.ol.Map({
//       target: mapRef.current.id,
//       layers: [
//         new window.ol.layer.Tile({
//           source: new window.ol.source.OSM()
//         })
//       ],
//       view: new window.ol.View({
//         center: window.ol.proj.fromLonLat([center.lng, center.lat]),
//         zoom: zoom
//       })
//     });
//   }, [center, zoom]);

//   return (
//     <div
//       ref={mapRef}
//       className={`map ${props.className}`}
//       style={props.style}
//       id="map"
//     ></div>
//   );
// };

import React from "react";
import "./Map.css";
import GoogleMapReact from "google-map-react";

const Map = (props) => {
  return (
    <div className={`map ${props.className}`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAYA75MsAOvlgyc666R-LC9OWr_24loZSM" }}
        defaultCenter={props.center}
        center={props.center}
        defaultZoom={props.zoom}
        margin={[50, 50, 50, 50]}
        // options={" "}
        // onChange={" "}
        // onChildClick={" "}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
