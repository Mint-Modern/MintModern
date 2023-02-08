import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMe, getSingleProduct, attachProductToOrder } from "../api/auth";
import Added from "./addedToCart";
import DeleteProduct from "./deleteProduct";
import EditProduct from "./editProduct";
import Locationhours from "./locationHours";

const SingleProduct = ({ products, setProducts, user }) => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [product, setProduct] = useState({});
  const [editProduct, setEditProduct] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  function showAlert() {
    alert("Added to cart!")
  }

  const addProductToLocalCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {
      products: [],
      isActive: true,
      salesTax: 0.0945,
      total: 0,
    };
    cart.products.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
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

  return !isAdmin ? (
    <div className="sp-page">
      <img src={product.image} className="placeholder" />
      <div className="sp">
        <p className="prod-name">{product.name}</p>
        <p className="cat">from {product.category}</p>
        <p>{product.description}</p>
        <p>| {product.price} |</p>
        <img src="https://i.ibb.co/642vNF2/add-icon-v2.png" alt="add-icon-v2" className="add-icon"
            onClick={async () => {
              user.name
                ? (await attachProductToOrder({ productId: product.id }))
                : (addProductToLocalCart(product));
              setTimeout(showAlert, 3000);
              goBack()
            }}
          />
        <button className="modifybuttons" onClick={goBack}>Back</button>
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
        <img src="https://i.ibb.co/642vNF2/add-icon-v2.png" alt="add-icon-v2" className="add-icon"
            onClick={async () => {
              user.name
                ? (await attachProductToOrder({ productId: product.id }))
                : (addProductToLocalCart(product));
              showAlert();
              goBack()
            }}
          />
      </div>
      <div className="mb">
        {editProduct ? (
          <EditProduct
            product={product}
            products={products}
            setProducts={setProducts}
          />
        ) : (
          <button
            className="modifybuttons"
            onClick={() => {
              setEditProduct(!editProduct);
            }}
          >
            {" "}
            Update Product
          </button>
        )}
        <DeleteProduct
          product={product}
          products={products}
          setProducts={setProducts}
        />
        <button className="modifybuttons" onClick={goBack}>
          Back
        </button>
        </div>
        <Locationhours/>
    </div>
  );
};

export default SingleProduct;
