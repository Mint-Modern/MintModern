import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const MyNavbar = ({ setToken }) => {
    return (
        <div className="allNavs">
            <div className="homelink">
          <Link to='/'>
              <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
                alt="mint-logo-250x200" className="logo" /> 
          </Link>
        </div>
            <nav className="my-nav">
                <Link to={'/myprofile'} className="navlink my">Profile</Link>
                {/* <Link to='myorders' className="navlink my">My Orders</Link> */}
                <Link to={'/fullmenu'} className="navlink my">Menu</Link>
                {/* <Link to='cart' className="navlink my">Cart</Link> */}
                <Logout setToken={setToken} />
            </nav>
        </div>
    )
}

export default MyNavbar;