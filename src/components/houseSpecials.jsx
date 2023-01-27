import React from "react";

const HouseSpecials = ({ products }) => {
  let productsToMap = products.map((product, index) => {
    if (product.category === "houseSpecials")
      return (
        <div className="products" key={index}>
          <h4>{product.name}</h4>
          <h5>Price: {product.price}</h5>
          <h5>Name: {product.name}</h5>
          <h5>Description: {product.description}</h5>
        </div>
      );
  });

  return (
    <>
      <h2>House Specials</h2>
      <div>{productsToMap}</div>
    </>
  );
};

export default HouseSpecials;
