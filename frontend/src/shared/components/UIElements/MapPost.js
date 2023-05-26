import React from "react";
import "./MapPlace.css";
import GoogleMapReact from "google-map-react";

const MapPost = (props) => {
  return (
    <div className={`map-place ${props.className}`}>
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

export default MapPost;
