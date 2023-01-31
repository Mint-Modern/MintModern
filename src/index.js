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
import Teasers from "./components/teasers";
import Baguette from "./components/baguette";
import Pho from "./components/phoSoup";
import Drinks from "./components/drinks";
import HouseSpecials from "./components/houseSpecials";
import Rice from "./components/rice";
import VermicelliBowl from "./components/vermicelliBowl";
import Desserts from "./components/desserts";
import SingleProduct from "./components/singleProduct";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

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
        <Route path="/" element={<Home token={token} setToken={setToken} />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/fullmenu" element={<FullMenu products={products} />} />
        <Route
          path="/products/:id"
          element={
            <SingleProduct products={products} setProducts={setProducts} />
          }
        />
        <Route
          path="/myprofile"
          element={<Customerprofile user={user} setToken={setToken} />}
        />
        <Route
          path="/fullmenu/teasers"
          element={<Teasers products={products} />}
        />
        <Route
          path="/fullmenu/desserts"
          element={<Desserts products={products} />}
        />
        <Route
          path="/fullmenu/baguette"
          element={<Baguette products={products} />}
        />
        <Route path="/fullmenu/pho" element={<Pho products={products} />} />
        <Route
          path="/fullmenu/drinks"
          element={<Drinks products={products} />}
        />
        <Route
          path="/fullmenu/houseSpecials"
          element={<HouseSpecials products={products} />}
        />
        <Route path="/fullmenu/rice" element={<Rice products={products} />} />
        <Route
          path="/fullmenu/vermicelliBowl"
          element={<VermicelliBowl products={products} />}
        />
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
