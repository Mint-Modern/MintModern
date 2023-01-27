import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const MyNavbar = ({ setToken }) => {
    return (
        <header>
            <nav>
            <Link to={'/myprofile'} className="navlink my">Profile</Link>
                {/* <Link to='myorders' className="navlink my">My Orders</Link> */}
                <Link to={'/fullmenu'} className="navlink my">Menu</Link>
                {/* <Link to='cart' className="navlink my">Cart</Link> */}
                <Logout setToken={setToken} />
            </nav>
        </header>
    )
}

export default MyNavbar;