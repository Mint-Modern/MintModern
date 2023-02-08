import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuNav from "./menuNav";
import { attachProductToOrder } from "../api/auth";

import BackToTopButton from "./backToTopButton";

const Drinks = ({ products, user }) => {
  console.log("drinkproducts", products);
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);


const handleChange = (e) => {
    setSelectedOption(e.target.selectedOption);
    setValue(e.target.value);
}


  let productsToMap = products?.map((product, index) => {
    const [added, setAdded] = useState(false);
    const optionsTapioca = product.description?.split(", ");

    if (product.category === "tapiocas")
      return (
        <div className="single-prod" key={index}>
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
          <h5>
            <select
              value={value || "Please Choose Your Flavor"}
              multiple={false}
              key={index}
              onChange={handleChange}
            >
              {optionsTapioca.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              })}
            </select>
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
  });

  const addProductToLocalCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {
      products: [],
      isActive: true,
      salesTax: 0.0945,
      total: 0,
    };
    let updatedProduct = { ...product, selectedOption };
    cart.products.push(updatedProduct);
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

      <BackToTopButton/>
    </>
  );
};

export default Drinks;
