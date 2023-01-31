import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
// import Logout from "./Logout";
import MyNavbar from "./MyNavbar";
import AboutUs from "./aboutUs";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Home = ({ token, setToken }) => {
  // const {isLoaded} = useLoadScript({
  //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  // });
  if (!token /*!isLoaded*/) {
    return (
      <div>
        <NavBar />
        <div className="aboutus">
          Other links and bedazzles we would need (pls change or delete
          classname as needed)
        </div>
        <p className="single-prod prod-name">
          Should we separate user-specific components to a side navbar?? To
          include customer current and previous orders and reviews?? (DELETE ME
          AFTERWARDS)
        </p>
        <p className="story">
          Need a component for: Bomb Pics (pls change or delete classname as
          needed)
        </p>
        <p className="story">
          Need a component for: Seasonal Offerings/Events (if any) (pls change
          or delete classname as needed)
        </p>
        <p className="story">
          Need a component for: Press Articles (pls change or delete classname
          as needed)
        </p>
        <p className="story">
          Need a component for: Reviews (pls change or delete classname as
          needed)
        </p>
        <p className="story">
          Need a component for: Location & Hours (pls change or delete classname
          as needed)
        </p>
        <div className="homepage">
          {/* We will combine the 2 divs after navbar when all components are done to persistently hide the other navbars in the components */}
          <AboutUs />
        </div>
        <div>Loading....</div>
        {/* <Map/> */}
      </div>
    );
  } else {
    return (
      <div>
        <MyNavbar setToken={setToken} />
        <div className="homepage">
          {/* We will combine the 2 divs after navbar when all components are done to persistently hide the other navbars in the components */}
          <AboutUs />
        </div>
      </div>
    );
  }
};

export default Home;
