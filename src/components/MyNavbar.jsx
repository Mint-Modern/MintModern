import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMe } from "../api/auth";
import Logout from "./Logout";

const MyNavbar = ({ setToken }) => {
  const token = localStorage.getItem("token");
    const [customer, setCustomer] = useState({});

    if (token) {
        useEffect(() => {
            const getCustomer = async () => {
                const response = await fetchMe(token);
                setCustomer(response);
            };
            getCustomer();
        }, [token]);
    }

  const isAdmin = customer.isAdmin === true;

  return !isAdmin ? (
    <div className="allNavs">
      <div className="homelink">
        <Link to='/'>
          <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
            alt="mint-logo-250x200" className="logo" /> 
        </Link>
      </div>
      <nav className="my-nav">
        <Link to={'/myprofile'} className="navlink my">My Profile</Link>
        {/* <Link to='myorders' className="navlink my">My Orders</Link> */}
        <Link to={'/fullmenu'} className="navlink my">Menu</Link>
        <Link to={"/aboutus"} className="navlink my">About us</Link>
        <Link to={'/cart'} className="navlink my">Cart</Link>
        <Logout setToken={setToken} />
      </nav>
    </div>
  ) : (
    <div className="allNavs">
    <div className="homelink">
      <Link to='/'>
        <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
          alt="mint-logo-250x200" className="logo" /> 
      </Link>
    </div>
    <nav className="my-nav">
      <Link to={'/myprofile'} className="navlink my">My Profile</Link>
      {/* <Link to='myorders' className="navlink my">My Orders</Link> */}
      <Link to={'/fullmenu'} className="navlink my">Menu</Link>
      {/* <Link to={"/aboutus"} className="navlink my">About us</Link> */}
      <Link to={'/cart'} className="navlink my">Cart</Link>
      <Link to={"/allcustomers"}>All Customers</Link>
      <Link to={"/newproduct"}>Add New Products</Link>   
      <Logout setToken={setToken} />
    </nav>
  </div>
    )
}

export default MyNavbar;
