import React, { useState, useEffect } from "react";
import { deleteOrderProduct, getActiveOrderByCustomer } from "../api/auth";
import MyNavbar from "./MyNavbar";
import AddProduct from "./addProduct";

const Cart = ({ user, orderProducts, setOrderProducts }) => {
  const [order, setOrder] = useState([]);
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const getOrders = async () => {
      const response = await getActiveOrderByCustomer(user.id);
      setOrder(response);
    };
    getOrders();
  }, [orderProducts]);
  console.log(order);

  let productsToMap = order.products?.map((product, index) => {
    return (
      <>
        <div className="single-prod" key={index}>
          <h4 className="prod-name">
            {product.quantity} X {product.name}
          </h4>
          <h5>{product.price}</h5>
          <select onChange={(event) => setQuantity(event.target.value)}>
            <option key="1" value="1">
              1
            </option>
            <option key="2" value="2">
              2
            </option>
            <option key="3" value="3">
              3
            </option>
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
      <div className="products">Order Total = {order.total}</div>
      <button>Checkout</button>
    </>
  );
};

export default Cart;
