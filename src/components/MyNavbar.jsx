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
      <header id="homelink">
        <Link to="/" >
          <img src="https://i.ibb.co/B6NjcdZ/logo-v2.png"
            alt="logo-v2-250x150" className="logo" />
        </Link>
        {/* <h2 className="hello"><i>Hello there, {customer.name}!</i></h2>   */}
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
      <nav className="my-nav">
        <Link to={'/orderhistory'} className="navlink my">My Orders</Link>
        <Link to={'/fullmenu'} className="navlink my">Menu</Link>
        <p>Reserve a Table!</p>
        <Link to={'/aboutus'} className="navlink my">About us</Link>
        <Link to={'/articles'} className="navlink my">Press Articles</Link>
        <p>Reviews</p>
        <Logout setToken={setToken} />
      </nav>
    </div>
  ) : (
    <div className="allNavs">
    <header id="homelink">
        <Link to="/" >
            <img src="https://i.ibb.co/B6NjcdZ/logo-v2.png"
              alt="logo-v2-250x150" className="logo" />
        </Link>
        <h2 className="hello"><i>Hello there, {customer.name}!</i></h2>
        <div id="lc-icons">
            <Link to="/myprofile">
              <img src="https://i.ibb.co/hM7Xn0g/profile-icon-v1-square.png"
                alt="profile-icon-v1-square" className="icon" />
            </Link>
            <Link to="/cart">
              <img src="https://i.ibb.co/FXNrrrQ/bag-icon-v1-square.png"
                alt="bag-icon-v1-square" className="icon" />
            </Link>
          </div>
      </header>
    <nav className="my-nav">
      <Link to={'/orderhistory'} className="navlink my">Online Orders</Link>
      <Link to={'/fullmenu'} className="navlink my">Menu</Link>
      <Link to={"/allcustomers"}>All Customers</Link>
      <Link to={"/newproduct"}>Add New Products</Link>   
      <p>Reservations</p>
      <Logout setToken={setToken} />
    </nav>
  </div>
    )
}

export default MyNavbar;
