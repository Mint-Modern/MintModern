import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import NavBar from "./components/navbar";
import AboutUs from "./components/aboutUs";
import Login from "./components/login";
import FullMenu from "./components/fullMenu";
import { getAllProducts } from "./api/auth";
import { fetchMe } from "./api/auth";
import Home from "./components/home";
import Register from "./components/register";
import Customerprofile from "./components/customerProfile";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (token) {
      const getMe = async () => {
        const data = await fetchMe(token);
        setUser(data);
      };
      getMe();
    }
  }, [token]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await getAllProducts();
      setProducts(response);
    };
    getProducts();
  }, [token]);

  return (
    <div>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/fullmenu" element={<FullMenu products={products} />} />
        <Route
          path="/myprofile"
          element={<Customerprofile user={user} setToken={setToken} />}
        ></Route>
      </Routes>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
