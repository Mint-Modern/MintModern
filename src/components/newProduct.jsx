import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../api/auth";
import Locationhours from "./locationHours";
import MyNavbar from "./MyNavbar";

const NewProduct = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      let newProduct = async () => {
        await createNewProduct({
          name,
          description,
          category,
          price,
          image
        })
    };
      newProduct();
      setProducts([newProduct, ...products]);
      navigate(`/fullmenu/${category}`);
      location.reload();
      console.log("new product added!")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <MyNavbar />
      <h1 className="new-prod">Create New Product</h1>
      <form className="newprodform" onSubmit={submitHandler}>
        <label htmlFor="name"></label>
        <input
          value={name}
          type="text"
          required
          placeholder="product name"
          onChange={(event) => setName(event.target.value)}
        ></input>
        <label htmlFor="description"></label>
        <input
          value={description}
          type="text"
          required
          placeholder="description"
          onChange={(event) => setDescription(event.target.value)}
        ></input>
        <label htmlFor="category"></label>
        <input
          value={category}
          type="text"
          required
          placeholder="category"
          onChange={(event) => setCategory(event.target.value)}
        ></input>
        <label htmlFor="price"></label>
        <input
          value={price}
          type="number"
          required
          placeholder="price"
          onChange={(event) => setPrice(parseInt(event.target.value))}
        ></input>
        <label htmlFor="image"></label>
        <input
          value={image}
          type="text"
          placeholder="image url"
          onChange={(event) => setImage(event.target.value)}
        ></input>
        <button type="submit">Add New Product</button>
        <button onClick={() => {navigate(-1);}}>
          Back
        </button>
      </form>
      <Locationhours/>
    </div>
  );
};

export default NewProduct;
