import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuNav from "./menuNav";
import { attachProductToOrder } from "../api/auth";

const Drinks = ({ products, user }) => {
  const navigate = useNavigate;
  const [value, setValue] = useState("");
  let productsToMap = []; 

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  productsToMap = products?.map((product, index) => {
    const optionsSmoothie = product.description?.split(", ");
    const optionsMilkTea = product.description?.split(", ");
    if (product.category === "smoothies")
      return (
          <div className="single-prod" key={index}>
            <h4
              className="prod-name"
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            >
              {product.name}
            </h4>
            <h5>
              <i>{product.description}</i>
            </h5>
            <h5>
              <select
                value={value}
                multiple={false}
                key={index}
                onChange={handleChange}
              >
                <option>Please Choose Your Flavor</option>
                {optionsSmoothie.map((option, index) => {
                  return (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </h5>
            <h5>| {product.price} |</h5>
            <button
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            >
              See Details!
            </button>
            <button
            onClick={async () => {
              user.length
                ? await attachProductToOrder({ productId: product.id })
                : addProductToLocalCart(product);
            }}
          >
            Add to cart!
          </button>
        </div>
      );
    if (product.category === "milkTeas") {
      return (
          <div className="single-prod" key={index}>
            <h4
              className="prod-name"
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            >
              {product.name}
            </h4>
            <h5>
              <i>{product.description}</i>
            </h5>
            <h5>
              <select
                value={value}
                multiple={false}
                key={index}
                onChange={handleChange}
              >
                <option>Please Choose Your Flavor</option>
                {optionsMilkTea.map((option, index) => {
                  return (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </h5>
            <h5>| {product.price} |</h5>
            <button
              onClick={() => {
                navigate(`/products/${product.id}`);
              }}
            >
              See Details!
            </button>
            <button
            onClick={async () => {
              user.length
                ? await attachProductToOrder({ productId: product.id })
                : addProductToLocalCart(product);
            }}
          >
            Add to cart!
          </button>
        </div>
      );
  };

  const addProductToLocalCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {
      products: [],
      isActive: true,
      salesTax: 0.0945,
      total: 0,
    };
    cart.products.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <>
      <MenuNav />
      <h2 className="prod-cat">
        <img
          src="https://i.ibb.co/CQdWn1w/Page-Break-Left-1-2.png"
          alt="Page-Break-Left-1-2"
          border="0"
        />
        Drinks
        <img
          src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png"
          alt="Page-Break-Right-1-2"
          border="0"
        />
      </h2>
      <div className="products">{productsToMap}</div>
    </>
  );
});
};

export default Drinks;
