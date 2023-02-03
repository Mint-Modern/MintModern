import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import NavBar from "./components/navbar";
import AboutUs from "./components/aboutUs";
import Login from "./components/login";
import FullMenu from "./components/fullMenu";
import {
  getAllProducts,
  getAllOrders,
  fetchMe,
  getAllOrderProducts,
} from "./api/auth";
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
import GetCustomersList from "./components/getCustomersList";
import NewProduct from "./components/newProduct";
import Cart from "./components/cart";
import OrderHistory from "./components/orderHistory";
import Confirmationpage from "./components/confirmationPage";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
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

  useEffect(() => {
    const getOrders = async () => {
      const response = await getAllOrders();
      setOrders(response);
    };
    getOrders();
  }, [token]);

  useEffect(() => {
    const getOrderProducts = async () => {
      const response = await getAllOrderProducts();
      setOrderProducts(response);
    };
    getOrderProducts();
  }, []);

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
        <Route
          path="/fullmenu"
          element={<FullMenu products={products} setProducts={setProducts} />}
        />
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
        <Route
          path="/cart"
          element={
            <Cart
              orderProducts={orderProducts}
              orders={orders}
              user={user}
              setOrderProducts={setOrderProducts}
              setUser={setUser}
              setOrders={setOrders}
            />
          }
        />
        <Route path="/fullmenu/rice" element={<Rice products={products} />} />
        <Route
          path="/fullmenu/vermicelliBowl"
          element={
            <VermicelliBowl
              products={products}
              orderProducts={orderProducts}
              orders={orders}
            />
          }
        />
        <Route path="/allcustomers" element={<GetCustomersList />} />
        <Route
          path="/newproduct"
          element={<NewProduct products={products} setProducts={setProducts} />}
        />
        <Route
          path="/orderhistory"
          element={
            <OrderHistory orders={orders} user={user} products={products} />
          }
        />
        <Route path="/thankyou" element={<Confirmationpage />} />
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
