import React from "react";
import NavBar from "./navbar";
import MyNavbar from "./MyNavbar";
import {Link} from "react-router-dom"
import Teasers from "./teasers";
import Baguette from "./baguette";
import Pho from "./phoSoup";
import Drinks from "./drinks";
import HouseSpecials from "./houseSpecials";
import Rice from "./rice";
import VermicelliBowl from "./vermicelliBowl";
import Desserts from "./desserts";

const FullMenu = ({ products }) => {
  return (
    <div className="menupage">
      <div className="allNavs">
        <div className="homelink">
          <Link to='/'>
              <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
                alt="mint-logo-250x200" className="logo" /> 
          </Link>
        </div>
          <p className="menu">MENU</p>
        <nav className="fm-nav">
          <Link to="/fullmenu/teasers">Teasers</Link>
          <Link to="/fullmenu/baguette">Baguette</Link>
          <Link to="/fullmenu/pho">Pho</Link>
          <Link to="/fullmenu/houseSpecials">House Specials</Link>
          <Link to="/fullmenu/rice">Rice</Link>
          <Link to="/fullmenu/vermicelliBowl">Vermicelli Bowls</Link>
          <Link to="/fullmenu/drinks">Drinks</Link>
          <Link to="/fullmenu/desserts">Desserts</Link>
        </nav>
      </div>
      <div className="fullmenu">
        <Teasers products={products} />
        <Baguette products={products} />
        <Drinks products={products} />
        <HouseSpecials products={products} />
        <Pho products={products} />
        <Rice products={products} />
        <VermicelliBowl products={products} />
        <Desserts products={products} />
      </div>
    </div>
  );
};

export default FullMenu;
