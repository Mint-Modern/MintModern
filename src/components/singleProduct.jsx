import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMe, getSingleProduct } from "../api/auth";
import DeleteProduct from "./deleteProduct";
import EditProduct from "./editProduct";


const SingleProduct = ({ products, setProducts }) => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [product, setProduct] = useState({});
  const [editProduct, setEditProduct] = useState(false);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  if (token) {
    useEffect(() => {
      const getCustomer = async () => {
        const response = await fetchMe(token);
        setCustomer(response);
      };
      getCustomer();
    }, [token]);
  }

  const isAdmin = customer.isAdmin === true;

  useEffect(() => {
    const getProduct = async () => {
      const response = await getSingleProduct(id);
      setProduct(response);
    };
    getProduct();
  }, []);

  // console.log("I AM PRODUCT IMAGE", product.image)

  return !isAdmin ? (
    <div className="sp-page">
      <img src={product.image} className="placeholder" />
      <div className="sp">
        <p className="prod-name">{product.name}</p>
        <p className="cat">from {product.category}</p>
        <p>{product.description}</p>
        <p>| {product.price} |</p>
        <button onClick={goBack}>Back</button>
      </div>
    </div>
  ) : (
      <div className="sp-page">
        <img src={product.image} className="placeholder" />
        <div className="sp">
          <p className="prod-name">{product.name}</p>
          <p className="cat">from {product.category}</p>
          <p>{product.description}</p>
          <p>| {product.price} |</p>
        </div>
        <div className="mb">
          {editProduct ? (
            <EditProduct
              product={product}
              products={products}
              setProducts={setProducts}
            />
        ) : (
          <button className="modifybuttons"
            onClick={() => {
              setEditProduct(!editProduct);
            }}
          > Update Product
          </button>
          )}
          <DeleteProduct product={product} products={products} setProducts={setProducts} />
          <button className="modifybuttons" onClick={goBack}>Back</button>
        </div>
    </div>
  );
};

export default SingleProduct;
