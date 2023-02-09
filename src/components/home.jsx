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

  if (!token) {
    return (
      <div >
        <NavBar />
        <div className="home">
          <img className="bottom" src="https://assets.simpleviewinc.com/simpleview/image/upload/crm/neworleans/69817_3039_01_8d46de5a-5056-b365-ab7d2df3d8829d3b.jpg" alt="pic1" />
          <img className="bottom" src="https://data.parkbench.com/content/data/businesses/8/c/1/0/8/NjAweDYwMA--_8c108b93b660ed960814ded1332f6424.jpg" alt="pic2" />
          <img className="bottom" src="https://i.ibb.co/3YVwhLX/FreretSt.jpg" alt="FreretSt" />
        </div>
        <div className="homepage">
          {/* We will combine the 2 divs after navbar when all components are done to persistently hide the other navbars in the components */}
          <Pressarticles />
          <AboutUs /> 
        </div>
        <Locationhours />
        <BackToTopButton/>
      </div>
    );
  } else {
    return (
      <div>
        <MyNavbar setToken={setToken} />
        <div className="home">
          <img className="bottom" src="https://assets.simpleviewinc.com/simpleview/image/upload/crm/neworleans/69817_3039_01_8d46de5a-5056-b365-ab7d2df3d8829d3b.jpg" alt="pic1" />
          <img className="bottom" src="https://data.parkbench.com/content/data/businesses/8/c/1/0/8/NjAweDYwMA--_8c108b93b660ed960814ded1332f6424.jpg" alt="pic2" />
          {/* <img className="bottom" src="https://i.imgur.com/q6U99Nu.jpg" alt="pic3" /> */}
          <img className="bottom" src="https://i.ibb.co/3YVwhLX/FreretSt.jpg" alt="FreretSt" />
          <img className="top" src="https://i.imgur.com/YRYlKBg.jpg" alt="bar"/>
        </div>
        <div className="homepage">
          {/* We will combine the 2 divs after navbar when all components are done to persistently hide the other navbars in the components */}
          <Pressarticles />
          <AboutUs /> 
        </div>
        <Locationhours/>
        <BackToTopButton/>
      </div>
    );
  }
};

export default Home;
