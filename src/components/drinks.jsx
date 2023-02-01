import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuNav from "./menuNav";

const Drinks = ({ products }) => {
  const navigate = useNavigate;
  const [value, setValue] = useState([]);
  const optionsSmoothie = [
    'Avocado', 
    'Blueberry', 
    'Coconut', 
    'Green Apple', 
    'Honeydew', 
    'Mango', 
    'Matcha Green Tea', 
    'Pineapple', 
    'Raspberry', 
    'Strawberry', 
    'Taro'];
  const optionsMilkTea = ['Green Milk Tea', 'Matcha Milk Tea', 'Taro Milk Tea', 'Thai Milk Tea'];

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  let productsToMap = products?.map((product, index) => {

    if (product.category === "smoothies" || product.category === "milkTeas")
      return (
      <> 
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
          <select value={value} onChange={handleChange}>
              {/* <option value="smoothies">Avocado</option>
              <option value="smoothies">Blueberry</option>
              <option value="smoothies">Coconut</option>
              <option value="smoothies">Green Apple</option>
              <option value="smoothies">Honeydew</option>
              <option value="smoothies">Mango</option>
              <option value="smoothies">Match Green Tea</option>
              <option value="smoothies">Pineapple</option>
              <option value="smoothies">Raspberry</option>
              <option value="smoothies">Strawberry</option> */}
              {/* <option value="smoothies">{product.description}</option> */}
              <option>Please Choose Your Flavor</option>
              {optionsSmoothie.map((option, index) => {
                return <option key={index}>
                  {option}
                </option>
              })}
            </select>
          </h5>
          <h5>| {product.price} |</h5>
          <button
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
          >
            Add to cart!
          </button>
        </div>
      </>
      );
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
};

export default Drinks;
