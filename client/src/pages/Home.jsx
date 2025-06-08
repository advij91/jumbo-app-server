import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import GoogleMapView from "../components/GoogleMapView";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <h2>Googe Map Expmple</h2>
        <GoogleMapView />
      </div>
    </>
  );
};

export default Home;
