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

import React, { useState, useEffect } from "react";
import "./MapPlace.css";
import GoogleMapReact from "google-map-react";
// import Marker from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import { Rating, Typography, useMediaQuery } from "@mui/material";
// import { Rating} from "@mui/material";

const MapPlace = (props) => {
  const {
    reviews,
    coordinates,
    zoom,
    setCoordinates,
    setBounds,
    loadedPlaces,
    setChildClicked,
  } = props;

  // const [childClick, setChildClick] = useState(null);

  console.log(reviews);
  // console.log(props);
  const isDesktop = useMediaQuery("(min-width:600px)");
  const center = {
    lat: 30,
    lng: 30,
  };
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  return (
    <div className={`map-place ${props.className}`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDW6M6HQB_FOeZIVIJnlb7nqMHxAOuDhNo" }}
        defaultCenter={center}
        center={props.coordinates}
        defaultZoom={props.zoom}
        margin={[50, 50, 50, 50]}
        // options={" "}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          // setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          if (e.marginBounds.ne && e.marginBounds.sw) {
            setBounds({
              ne: e.marginBounds.ne,
              nw: e.marginBounds.nw,
              se: e.marginBounds.se,
              sw: e.marginBounds.sw,
            });
          }
        }}
        onChildClick={(child) => {
          setChildClicked(child);
        }}
      >
        {loadedPlaces?.map((place, index) => {
          // console.log(place.location.lat);
          // console.log(place.location.lng);
          return (
            <Marker
              lat={place.location.lat}
              lng={place.location.lng}
              // key={place._id}
              key={index}
              props={place}
              color="red"
              onClick={() => handleMarkerClick(place)}
            ></Marker>
          );
        })}
        {/* {loadedPlaces?.map((place) => {
          console.log(place.location.lat);
          console.log(place.location.lng);

          <Marker
            lat={place.location.lat}
            lng={place.location.lng}
            key={place._id}
          >
            <Paper elevation={3}>
              <Typography variant="subtitle2" gutterBottom>
                {loadedPlaces.title}
              </Typography>
              <img
                src={`http://localhost:5000/${props.image}`}
                alt={loadedPlaces.title}
              />
            </Paper>
          </Marker>;
        })} */}
      </GoogleMapReact>
    </div>
  );
};

const Marker = ({ props, color, onClick }) => {
  // console.log(props);
  return (
    <div className="div-marker" onClick={onClick}>
      <Paper elevation={3} className="map-paper">
        <Typography variant="subtitle2" gutterBottom>
          {props.title}
        </Typography>
        {/* <Rating
          name="half-rating-read"
          value={props.reviews ? props.reviews : 0}
          precision={0.5}
          readOnly
        /> */}
        <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
      </Paper>
    </div>
  );
};

export default MapPlace;
