import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../db";

const AddProduct = ({ order, setOrder }) => {
  const orderId = order.id;
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  return <div></div>;
};

export default AddProduct;
