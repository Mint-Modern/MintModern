import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navbar";
// import Logout from "./Logout";
import MyNavbar from "./MyNavbar";

const Home = ({ token }) => {
    if (!token) {
        return (
            <div>
                <NavBar/>
                Public Navbar and other links and bedazzles we would need
            </div>
        )
    } else {
        return (
            <div>
                <MyNavbar />
                My Navbar and probably the same concept as main guest page
                {/* <Logout /> */}

            </div>
        )
    }
};

export default Home;