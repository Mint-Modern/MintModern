import React from "react";
import NavBar from "./navbar";
import MyNavbar from "./MyNavbar";
import { Link } from "react-router-dom";
import Teasers from "./teasers";
import Baguette from "./baguette";
import Pho from "./phoSoup";
// import Drinks from "./drinks";
import HouseSpecials from "./houseSpecials";
import Rice from "./rice";
import VermicelliBowl from "./vermicelliBowl";
import Desserts from "./desserts";

const FullMenu = ({ products, setProducts, user }) => {
  return (
    <div className="menupage">
      <div className="allNavs">
        <header id="homelink">
          <Link to="/">
            <img
              src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
              alt="mint-logo-250x200"
              className="logo"
            />
          </Link>
          <p className="menu">MENU</p>
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
        <nav className="fm-nav">
          <Link to="/fullmenu/teasers">Teasers</Link>
          <Link to="/fullmenu/baguette">Baguette</Link>
          <Link to="/fullmenu/pho">Pho</Link>
          <Link to="/fullmenu/houseSpecials">House Specials</Link>
          <Link to="/fullmenu/rice">Rice</Link>
          <Link to="/fullmenu/vermicelliBowl">Vermicelli Bowls</Link>
          {/* <Link to="/fullmenu/drinks">Drinks</Link> */}
          <Link to="/fullmenu/desserts">Desserts</Link>
        </nav>
      </div>
      <div className="fullmenu">
        <Teasers products={products} user={user} />
        <Baguette products={products} user={user} />
        {/* <Drinks products={products} user={user} /> */}
        <HouseSpecials products={products} user={user} />
        <Pho products={products} user={user} />
        <Rice products={products} user={user} />
        <VermicelliBowl products={products} user={user} />
        <Desserts products={products} user={user} />
      </div>
    </div>
  );
};

export default FullMenu;
