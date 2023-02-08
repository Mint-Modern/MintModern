import React from "react";
import { Link } from "react-router-dom";


const MenuNav = () => {
    return (
      <div className="allNavs hideme">
        <header id="homelink">
        <Link to="/" >
            <img src="https://i.ibb.co/B6NjcdZ/logo-v2.png"
              alt="logo-v2-250x150" className="logo" />
        </Link>
        <Link className="mini" to={"/fullmenu"}>| Back to Full Menu |</Link>
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
        {/* <Link className="mini" to={"/fullmenu"}>| View Full Menu |</Link> */}
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