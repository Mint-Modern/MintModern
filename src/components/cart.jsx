import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createNewOrder,
  deleteOrderProduct,
  getActiveOrderByCustomer,
  updateOrder,
} from "../api/auth";
import Locationhours from "./locationHours";
import MyNavbar from "./MyNavbar";

const Cart = ({ user, orderProducts, setOrderProducts, setToken }) => {
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  !user.name
    ? useEffect(() => {
        const storedOrder = localStorage.getItem("cart");
        if (storedOrder) {
          setOrder(JSON.parse(storedOrder));
        }
      }, [])
    : useEffect(() => {
        const getOrders = async () => {
          const response = await getActiveOrderByCustomer(user.id);
          setOrder(response);
        };
        getOrders();
      }, [orderProducts]);

  const clickHandler = async (event) => {
    event.preventDefault();
    setOrder({ ...order, isActive: false });
    await updateOrder({ orderId: order.id, isActive: false });
    localStorage.removeItem("cart");
    const userId = user.id;
    const newOrder = await createNewOrder({
      userId,
      total: 0,
      salesTax: 0.0945,
      isActive: true,
    });
    navigate("/thankyou");
    console.log("you checked out");
  };

  const handler = async (event) => {
    event.preventDefault();
    navigate("/fullmenu");
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedProduct = { ...order.products[index], quantity: newQuantity };
    const updatedProducts = [
      ...order.products.slice(0, index),
      updatedProduct,
      ...order.products.slice(index + 1),
    ];
    setOrder({ ...order, products: updatedProducts });
    localStorage.setItem(
      "cart",
      JSON.stringify({ ...order, products: updatedProducts })
    );
  };

  let newArray = Array.from({ length: 10 }, (_, i) => i + 1);
  let optionsToMap = newArray.map((option, index) => {
    return (
      <option value={index + 1} key={index}>
        {index + 1}
      </option>
    );
  });

  const removeItem = (index) => {
    const updatedProducts = [
      ...order.products.slice(0, index),
      ...order.products.slice(index + 1),
    ];
    setOrder({ ...order, products: updatedProducts });
    localStorage.setItem(
      "cart",
      JSON.stringify({ ...order, products: updatedProducts })
    );
  };

  let runningTotal = 0;

  let productsToMap = order.products?.map((product, index) => {
    runningTotal += product.price * product.quantity;

    return (
      <div className="single-prod" key={index}>
        <h4 className="prod-name">
          {product.quantity} X {product.name}
        </h4>
        <h5>{product.price}</h5>
        <select onChange={(event) => updateQuantity(index, event.target.value)}>
          {optionsToMap}
        </select>
        {user.length ? (
          <button
            onClick={async () =>
              setOrderProducts(await deleteOrderProduct(product.orderProductId))
            }
          >
            Remove item
          </button>
        ) : (
          <button className="modifybuttons" onClick={() => removeItem(index)}>
            Remove item
          </button>
        )}
      </div>
    );
  });

  return (
    <>
      <MyNavbar setToken={setToken} />
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
      {!order.products ? (
        <>
          <div className="products">
            <h2 className="prod-cat">Cart is empty, go look at our menu!</h2>
          </div>
          <div className="products">
            <button className="modifybuttons" onClick={handler}>
              Menu
            </button>
          </div>
        </>
      ) : (
        <div>
          <div className="products">
            Order Total = $
            {
              (runningTotal =
                Math.round(
                  (runningTotal + runningTotal * order.salesTax) * 100
                ) / 100)
            }
          </div>
          <div className="products">
            <button className="modifybuttons" onClick={clickHandler}>
              Checkout
            </button>
          </div>
        </div>
      )}
      <Locationhours />
    </>
  );
};

export default Cart;
