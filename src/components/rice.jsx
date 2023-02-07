import React from "react";
import { useNavigate } from "react-router-dom";
import MenuNav from "./menuNav";
import { attachProductToOrder } from "../api/auth";

const Rice = ({ products, user }) => {
  const navigate = useNavigate();
  let productsToMap = products?.map((product, index) => {
    if (product.category === "rice")
      return (
        <div className="single-prod" key={index}>
          <div className="top"
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}>
            <img src={product.image} className="prod-photo" />
            <h4 className="prod-name">
            {product.name}
            </h4>
          </div>
          <h5 className="content">
            <i>{product.description}</i>
          </h5>
          <h5 className="content">| {product.price} |</h5>
          <img src="https://i.ibb.co/642vNF2/add-icon-v2.png" alt="add-icon-v2" className="add-icon"
            onClick={async () => {
              user.name
                ? await attachProductToOrder({ productId: product.id })
                : addProductToLocalCart(product);
              showAlert();
            }}
            /> 
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
        Rice
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

export default Rice;
