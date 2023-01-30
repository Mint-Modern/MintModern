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

  return (
    <div>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const updatedProduct = await updateProduct({
              name,
              description,
              category,
              price,
              productId,
            });
            setProducts([updatedProduct, ...products]);
            navigate(-1);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <h1>Create New Product</h1>
        <label htmlFor="title">Name</label>
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <label htmlFor="title">Description</label>
        <input
          value={description}
          type="text"
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        ></input>
        <label htmlFor="title">Category</label>
        <input
          value={category}
          type="text"
          placeholder="category"
          onChange={(event) => setCategory(event.target.value)}
        ></input>
        <label htmlFor="title">Price</label>
        <input
          value={price}
          type="text"
          placeholder="price"
          onChange={(event) => setPrice(parseInt(event.target.value))}
        ></input>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
