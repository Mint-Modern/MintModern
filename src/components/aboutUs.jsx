import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {

    return (
        <div className="aboutus">
            <header >
                <Link to='/' id='homelink'><h1>Mint</h1>
                <h4>Modern Vietnamese Bistro and Bar</h4></Link>
            </header>
            <h2>Our Story!</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    )
};





export default AboutUs;