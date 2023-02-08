import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
// import Logout from "./Logout";
import MyNavbar from "./MyNavbar";
import AboutUs from "./aboutUs";
import Pressarticles from "./pressArticles";
import Locationhours from "./locationHours";
import BackToTopButton from "./backToTopButton";

// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const Home = ({ token, setToken }) => {
  // const {isLoaded} = useLoadScript({
  //     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  // });
  if (!token /*!isLoaded*/) {
    return (
      <div>
        <NavBar />
        {/* <p className="story">
          Need a component for: Bomb Pics (pls change or delete classname as
          needed)
        </p>
        
        </p> */}
        <div className="home">
        <img className="top" src="https://i.ibb.co/3YVwhLX/FreretSt.jpg" alt="FreretSt" />
        <img className="bottom" src="https://i.ibb.co/Df5TZMx/bar.jpg" alt="bar"/>
        </div>
        <div className="homepage">
          {/* We will combine the 2 divs after navbar when all components are done to persistently hide the other navbars in the components */}
          
          <Locationhours />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <MyNavbar setToken={setToken} />
        <div className="homepage">
          {/* We will combine the 2 divs after navbar when all components are done to persistently hide the other navbars in the components */}
          <AboutUs />
          <Pressarticles />
          
        </div>
        <Locationhours/>
        <BackToTopButton/>
      </div>
    );
  }
};

export default Home;
