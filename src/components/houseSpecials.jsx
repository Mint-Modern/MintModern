import React from "react";
import MenuNav from "./menuNav";

const HouseSpecials = ({ products }) => {
  let productsToMap = products.map((product, index) => {
    if (product.category === "houseSpecials")
      return (
        <div className="single-prod" key={index}>
          <h4 className="prod-name">{product.name}</h4>
          <h5><i>{product.description}</i></h5>
          <h5>| {product.price} |</h5>  
        </div>
      );
  });

  return (
    <>
      <MenuNav />
      <h2 className="prod-cat">
        <img src="https://i.ibb.co/CQdWn1w/Page-Break-Left-1-2.png" alt="Page-Break-Left-1-2" border="0"/>
          House Specials
        <img src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png" alt="Page-Break-Right-1-2" border="0"/>
      </h2>
      <div className="products">{productsToMap}</div>
    </>
  );
};

export default HouseSpecials;
