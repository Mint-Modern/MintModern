import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const MyNavbar = ({ setToken }) => {
    return (
        <div>
            <header >
                <Link to='/' id='homelink'><h1>Mint</h1>
                <h4>Modern Vietnamese Bistro and Bar</h4></Link>
            </header>
            <nav>
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