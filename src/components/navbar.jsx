import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, setToken }) => {
  return (
    <div className="allNavs abtnav">
      <header id="homelink">
        <Link to="/">
          <a href="https://imgbb.com/">
            <img
              src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
              alt="mint-logo-250x200"
              className="logo"
            />
          </a>
        </Link>
      </header>
      <nav className="main-nav">
        <Link to={"/login"}>Log In</Link>
        <Link to={"/register"}>Register Here</Link>
        <Link to={"/aboutus"}>About us</Link>
        <Link to={"/fullmenu"}>Menu</Link>
        <Link to={"/cart"}>Cart</Link>
      </nav>
    </div>
  );
};

export default NavBar;
