import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, setToken }) => {
  return (
    <div className="allNavs abtnav">
      <header id="homelink">
        <Link to="/">
          <img src="https://i.ibb.co/B6NjcdZ/logo-v2.png"
            alt="logo-v2-250x150" className="logo" />
        </Link>
        <div id="lc-icons">
            <Link to="/login">
              <img src="https://i.ibb.co/hM7Xn0g/profile-icon-v1-square.png"
                alt="profile-icon-v1-square" className="icon" />
            </Link>
            <Link to="/cart">
              <img src="https://i.ibb.co/FXNrrrQ/bag-icon-v1-square.png"
                alt="bag-icon-v1-square" className="icon last" />
            </Link>
          </div>
      </header>
      <nav className="main-nav">
        {/* <Link to={"/login"}>Log In</Link> */}
        {/* <Link to={"/register"}>Register Here</Link> */}
        <Link to={"/fullmenu"}>Menu</Link>
        <Link to={"/aboutus"}>About us</Link>
        <Link to={"/articles"}>Press Articles</Link>
        {/* <Link to={"/cart"}>Cart</Link> */}
      </nav>
    </div>
  );
};

export default NavBar;
