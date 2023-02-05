import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../api/auth";

const EditProduct = ({ product, products, setProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const productId = product.id;

  console.log("I AM PRODUCT", product);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      let updatedProduct = async () => {
        await updateProduct(
          name,
          description,
          category,
          price,
          productId,
        )
      };
      updatedProduct();
      setProducts([updatedProduct, ...products]);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <form className="editprodform"
        onSubmit={submitHandler}>
        <h3>Update {product.name}</h3>
        <label htmlFor="title"></label>
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <label htmlFor="description"></label>
        <input
          value={description}
          type="text"
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        ></input>
        <label htmlFor="category"></label>
        <input
          value={category}
          type="text"
          placeholder="category"
          onChange={(event) => setCategory(event.target.value)}
        ></input>
        <label htmlFor="price"></label>
        <input
          value={price}
          type="number"
          placeholder="price"
          onChange={(event) => setPrice(event.target.value)}
        ></input>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;