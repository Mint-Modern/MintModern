import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuNav from "./menuNav";
import { attachProductToOrder } from "../api/auth";

const Teasers = ({ products, user }) => {
  const navigate = useNavigate();

  let productsToMap = products?.map((product, index) => {
    if (product.category === "teasers")
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
          <h5>| {product.price} |</h5>
          <button
            onClick={async () => {
              user.name
                ? await attachProductToOrder({ productId: product.id })
                : addProductToLocalCart(product);
            }}
          >
            Add to cart!
          </button>
        </div>
      );
  });

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
        Teasers
        <img
          src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png"
          alt="Page-Break-Right-1-2"
          border="0"
        />
      </h2>
      <div className="products">{productsToMap}</div>
    </>
  );
};

export default Teasers;
