import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, setToken }) => {

  return (
    <>
      <nav>
        <Link className="navlink" to={"/login"}>Sign In</Link>
        <Link className="navlink" to={"/register"}>Register Here</Link>
        <Link className="navlink" to={"/aboutus"}>About us</Link>
        <Link className="navlink" to={"/fullmenu"}>Menu</Link>
      </nav>
    </>
  );
};

export default NavBar;
