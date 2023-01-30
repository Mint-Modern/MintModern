import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api/auth";

const SingleProduct = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  
  const navigate = useNavigate();
  const goBack = () => { navigate(-1); }

  useEffect(() => {
    const getProduct = async () => {
      const response = await getSingleProduct(id);
      setProduct(response);
    };
    getProduct();
  }, []);

  // console.log("I AM PRODUCT", product)

  return (
    <div className="single-prod">
      {/* <p>prolly an image here if we have it?</p> */}
      <p className="prod-name">{product.name}</p>
      <p className="cat">from {product.category}</p>
      <p>{product.description}</p>
      <p>| {product.price} |</p>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default SingleProduct;
