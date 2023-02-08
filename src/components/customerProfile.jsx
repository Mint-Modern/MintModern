import React, { useReducer } from "react";
import IsAdmin from "./isAdmin";
import MyNavbar from "./MyNavbar";

const Customerprofile = ({ setToken, user }) => {
  const isAdmin = user.isAdmin === true;

  return (
    <div className="custprof">
      <header>
        <MyNavbar setToken={setToken} />
      </header>
      <h2 className="greeting">
        <img
          src="https://i.ibb.co/CQdWn1w/Page-Break-Left-1-2.png"
          alt="Page-Break-Left-1-2"
          border="0"
        />
        {user.name}'s Profile
        <img
          src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png"
          alt="Page-Break-Right-1-2"
          border="0"
        />
      </h2>
      <div className="pt1">
        <div className="left">
          {isAdmin ? (
            <img
              src="https://i.ibb.co/mSk5ccF/profile-photo-v2-2.png"
              alt="profile-photo-v2-2"
              className="profile"
            />
          ) : (
            <img
              src="https://i.ibb.co/SN7D905/profile-photo-v1-2.png"
              alt="profile-photo-v1-2"
              className="profile"
            />
          )}
          <h3 className="status">{isAdmin ? "Mint Admin" : "Mint Patron"}</h3>
        </div>
        <div className="right">
          <h4 className="sh">Account Information</h4>
          <div className="sub">
            <p>
              <span className="caps">Mint Username:</span> {user.name}
            </p>
            <p>
              <span className="caps">Mint Patron Since:</span> 2022{" "}
            </p>
            <p>
              <span className="caps">First Name:</span> {user.name}
            </p>
            {/* <p><span className="caps">Last Name:</span> <i>add your last name here</i></p>
          <p><span className="caps">Birth Date:</span> <i>add your birthday here</i></p> */}
            <p>
              <span className="caps">Email:</span> {user.email}
            </p>
            <p>
              <span className="caps">Mobile Number</span>: {user.phoneNumber}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="wips">
        <h4 className="sh">Your Orders</h4>
          <p className="sub">🚧 Cooking in Progress! 🚧</p>
          <p className="sub"><i>Please check back for updates!</i></p> 
        <h4 className="sh">Your Reviews</h4>
          <p className="sub">🚧 Cooking in Progress! 🚧</p>
          <p className="sub"><i>Please check back for updates!</i></p> 
        </div> */}
    </div>
  );
};

export default Customerprofile;
