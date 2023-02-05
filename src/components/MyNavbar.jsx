import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchMe } from "../api/auth";
import Logout from "./Logout";

const MyNavbar = ({ setToken, user}) => {
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
      <header id="homelink">
        <Link to="/" >
          <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
            alt="mint-logo-250x200" className="logo" />
        </Link>
        <h2 className="hello"><i>Hello there, {customer.name}!</i></h2>  
        <div id="lc-icons">
          <Link to="/myprofile">
            <img src="https://i.ibb.co/vxsQDTG/profile-icon-v1.png" 
              alt="profile-icon-v1" className="icon"/>
          </Link>
          <Link to="/cart">
            <img src="https://i.ibb.co/bXrZxf2/cart-icon-v1.png" 
              alt="cart-icon-v1" className="icon" />
          </Link>
        </div>
      </header>
      <nav className="my-nav">
        <Link to='/orderhistory' className="navlink my">My Orders</Link>
        <Link to={'/fullmenu'} className="navlink my">Menu</Link>
        <Link to={"/aboutus"} className="navlink my">About us</Link>
        <Logout setToken={setToken} />
      </nav>
    </div>
  ) : (
    <div className="allNavs">
    <header id="homelink">
        <Link to="/" >
          <img src="https://i.ibb.co/zxB68bW/mint-logo-250x200.png"
            alt="mint-logo-250x200" className="logo" />
        </Link>
        <h2 className="hello"><i>Hello there, {customer.name}!</i></h2>
        <div id="lc-icons">
          <Link to="/myprofile">
            <img src="https://i.ibb.co/vxsQDTG/profile-icon-v1.png" 
              alt="profile-icon-v1" className="icon"/>
          </Link>
          <Link to="/cart">
            <img src="https://i.ibb.co/bXrZxf2/cart-icon-v1.png" 
              alt="cart-icon-v1" className="icon" />
          </Link>
        </div>
      </header>
    <nav className="my-nav">
      <Link to='/orderhistory' className="navlink my">My Orders</Link>
      <Link to={'/fullmenu'} className="navlink my">Menu</Link>
      <Link to={"/allcustomers"}>All Customers</Link>
      <Link to={"/newproduct"}>Add New Products</Link>   
      <Logout setToken={setToken} />
    </nav>
  </div>
    )
}

export default MyNavbar;
