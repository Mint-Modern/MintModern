import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, setToken }) => {

  return (
    <div>
      <header >
        <Link to='/' id='homelink'><h1>Mint</h1>
        <h4>Modern Vietnamese Bistro and Bar</h4></Link>
      </header>
      <nav>
        <Link className="navlink" to={"/login"}>Sign In</Link>
        <Link className="navlink" to={"/register"}>Register Here</Link>
        <Link className="navlink" to={"/aboutus"}>About us</Link>
        <Link className="navlink" to={"/fullmenu"}>Menu</Link>
      </nav>
    </div>
  );
};

export default NavBar;
