import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import AboutUs from "./components/aboutUs";
import Login from "./components/login";
import FullMenu from "./components/fullMenu";
import { getAllProducts } from "./api/testapi";
import { fetchMe } from "./api/auth";

const App = () => {
  const [token, setToken] = useState("");
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
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route path="/fullmenu" element={<FullMenu products={products} />} />
        </Routes>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
