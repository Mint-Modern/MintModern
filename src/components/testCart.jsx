import React, { useState, useEffect } from "react";
import { deleteOrderProduct, getActiveOrderByCustomer } from "../api/auth";
import MyNavbar from "./MyNavbar";
import AddProduct from "./addProduct";
import Locationhours from "./locationHours";

const Cart = ({ user, orderProducts, setOrderProducts }) => {
  const [order, setOrder] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      const response = await getActiveOrderByCustomer(user.id);
      setOrder(response);
    };
    getOrders();
  }, [orderProducts]);

  console.log(order);

  const updateQuantity = (index, newQuantity) => {
    const updatedProduct = { ...order.products[index], quantity: newQuantity };
    const updatedProducts = [
      ...order.products.slice(0, index),
      updatedProduct,
      ...order.products.slice(index + 1),
    ];
    setOrder({ ...order, products: updatedProducts });
  };

  let newArray = Array.from({ length: 10 }, (_, i) => i + 1);
  let optionsToMap = newArray.map((option, index) => {
    return (
      <option value={index + 1} key={index}>
        {index + 1}
      </option>
    );
  });

  let runningTotal = 0;

  let productsToMap = order.products?.map((product, index) => {
    runningTotal += product.price * product.quantity;

    return (
      <>
        <div className="single-prod" key={index}>
          <h4 className="prod-name">
            {product.quantity} X {product.name}
          </h4>
          <h5>{product.price}</h5>
          <select
            onChange={(event) => updateQuantity(index, event.target.value)}
          >
            {optionsToMap}
          </select>
          <button
            onClick={async () =>
              setOrderProducts(await deleteOrderProduct(product.orderProductId))
            }
          >
            Remove item
          </button>
        </div>
      </>
    );
  });

  return (
    <>
      <MyNavbar />
      <h2 className="prod-cat">
        <img
          src="https://i.ibb.co/CQdWn1w/Page-Break-Left-1-2.png"
          alt="Page-Break-Left-1-2"
          border="0"
        />
        Cart
        <img
          src="https://i.ibb.co/x1VqQK5/Page-Break-Right-1-2.png"
          alt="Page-Break-Right-1-2"
          border="0"
        />
      </h2>
      <div className="products">{productsToMap}</div>
      <div className="products">Order Total = {runningTotal}</div>
      <button>Checkout</button>
      <Locationhours/>
    </>
  );
};

export default Cart;
