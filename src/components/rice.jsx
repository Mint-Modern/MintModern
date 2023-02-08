import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuNav from "./menuNav";
import { attachProductToOrder } from "../api/auth";
import BackToTopButton from "./backToTopButton";

const SingleProduct = ({ product, user }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

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
    <div className="single-prod">
      <div
        className="top"
        onClick={() => {
          navigate(`/products/${product.id}`);
        }}
      >
        <img src={product.image} className="prod-photo" />
        <h4 className="prod-name">{product.name}</h4>
      </div>
      <h5 className="content">
        <i>{product.description}</i>
      </h5>
      <h5 className="content">| {product.price} |</h5>
      <img
        src="https://i.ibb.co/642vNF2/add-icon-v2.png"
        alt="add-icon-v2"
        className="add-icon"
        onClick={async () => {
          user.name
            ? await attachProductToOrder({ productId: product.id })
            : addProductToLocalCart(product);
          setAdded(true);
          setTimeout(() => {
            setAdded(false);
          }, 1000);
        }}
      />
      {added && (
        <div className="pop-up">
          <div className="overlay"></div>
          <div className="window_content">Added to Cart!</div>
        </div>
      )}
    </div>
  );
};

const Rice = ({ products, user }) => {
  let productsToMap = products?.map((product, index) => {
    if (product.category === "rice")
      return <SingleProduct key={index} product={product} user={user} />;
  });

  return (
    <>
      <MenuNav />
      <h2 className="prod-cat">
        <img
          src="https://i.ibb.co/CQdWn1w/Page-Break-Left-1-2.png"
          alt="Page-Break-Left-1-2"
          border="0"
        />
        Rice
        <img
          src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png"
          alt="Page-Break-Right-1-2"
          border="0"
        />
      </h2>
      <div className="products">{productsToMap}</div>
      <BackToTopButton/>
    </>
  );
};

export default Rice;
