import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewProduct = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const newProduct = await createNewProduct({
              name,
              description,
              category,
              price,
            });
            setProducts([newProduct, ...products]);
            navigate("/");
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
          required
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <label htmlFor="title">Description</label>
        <input
          value={description}
          type="text"
          required
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        ></input>
        <label htmlFor="title">Category</label>
        <input
          value={category}
          type="text"
          required
          placeholder="category"
          onChange={(event) => setCategory(event.target.value)}
        ></input>
        <label htmlFor="title">Price</label>
        <input
          value={price}
          type="text"
          required
          placeholder="price"
          onChange={(event) => setPrice(parseInt(event.target.value))}
        ></input>
      </form>
    </div>
  );
};

export default NewProduct;
