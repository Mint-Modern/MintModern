import React from "react";
// import {NavLink} from "react-router-dom";
// need to import public and user navbar

const Home = ({ token }) => {
    if (!token) {
        return (
            <div>
                Public Navbar and other links and bedazzles we would need
            </div>
        )
    } else {
        return (
            <div>
                My Navbar and probably the same concept as main guest page
            </div>
        )
    }
};

export default Home;