import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSingleProduct } from "../api/auth";

const SingleProduct = ({ products }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const response = await getSingleProduct(id);
      setProduct(response);
    };
    getProduct();
  }, []);

  return (
    <div className="single-product">
      <div className="header-info">
        <p className="food-title"></p>
        <p className="food-number"></p>
      </div>
      {/* <div classname="food-buttons">
                <button classname="detail-button" data-id={idk} onClick={() => {getSingleProduct()}}>See Details</button>
            </div> */}
    </div>
  );
};

export default SingleProduct;
