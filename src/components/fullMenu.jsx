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
    <>
      <header className="logo" >
        <Link to='/' id='homelink'><h1>Mint</h1>
        <h4>Modern Vietnamese Bistro and Bar</h4></Link>
      </header>
      <h2 className="header menu">Menu</h2>
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
    </>
  );
};

export default FullMenu;
