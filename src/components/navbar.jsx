import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, setToken }) => {
  return (
    <div className="allNavs abtnav">
      <header id="homelink">
        <Link to="/" >
          <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
            alt="mint-logo-250x200" className="logo" />
        </Link>
        <div id="lc-icons">
            <Link to="/myprofile">
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
        {/* <Link to={"/cart"}>Cart</Link> */}
      </nav>
    </div>
  );
};

export default NavBar;
