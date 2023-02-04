import React from "react";
import {  useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/auth";

const DeleteProduct = ({product, products, setProducts}) => {
    // console.log("PRODUCT", product)
  const navigate = useNavigate();

    return (
        <div>
        <button className="modifybuttons"
          onClick={async () => {
          setProducts(await deleteProduct({ productId: product.id }))
          console.log("product deleted!");
          navigate("/fullmenu")
          location.reload();
            }}>Delete Product</button>
        </div>
    )
}

export default DeleteProduct