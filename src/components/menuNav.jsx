import React from "react";
import { Link } from "react-router-dom";

const MenuNav = () => {
    return (
      <div className="allNavs hideme">
        <div className="homelink">
          <Link to='/'>
              <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
                alt="mint-logo-250x200" className="logo" /> 
          </Link>
        </div>
        <Link className="mini" to={"/fullmenu"}>| Back to Full Menu |</Link>
        <nav className="menu-nav">
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
    )
}

export default MenuNav