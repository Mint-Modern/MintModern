import React from "react";

const Logout = ({ setToken }) => {
  return (
    <button
      type="button"
      className="logoutbutton"
      onClick={() => {
        localStorage.removeItem("token");
        setToken(null);
        location.pathname = "/";
      }}
    >
      Logout
    </button>
  );
};

export default Logout;
