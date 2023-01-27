import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ token, setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <>
      <nav>
        {!token ? (
          <Link className="navlink" to="/login">
            Sign Up/Sign In
          </Link>
        ) : (
          <Link className="navlink" to={"/login"} onClickCapture={logout}>
            Logout
          </Link>
        )}
        <Link className="navlink" to={"/aboutus"}>
          About us
        </Link>
        <Link className="navlink" to={"/fullmenu"}>
          Menu
        </Link>
      </nav>
    </>
  );
};

export default NavBar;
