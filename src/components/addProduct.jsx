import React, { useEffect, useState } from "react";
import { attachProductToOrder, getAllOrders } from "../api/auth";

const AddProduct = ({ setOrder, product }) => {
  // const orderId = order.id;
  const productId = product.id;
  const [quantity, setQuantity] = useState("");

  return (
    <div>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const addProduct = await attachProductToOrder({
              productId,
              quantity,
            });

            const orders = await getAllOrders();
            const orderToFilter = orders?.filter((order) => {
              return addProduct.orderId === order.id;
            });
            setOrder(orderToFilter[0]);
          } catch {
            console.error(error);
          }
        }}
      >
        <label htmlFor="quantity">Quantity</label>
        <input
          value={quantity}
          type="number"
          placeholder="quantity"
          min="1"
          onChange={(event) => setQuantity(parseInt(event.target.value))}
        ></input>
        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
};

export default AddProduct;
