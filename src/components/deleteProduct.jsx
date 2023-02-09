import React from "react";
import {  useNavigate } from "react-router-dom";
import { deleteProduct } from "../api/auth";

const DeleteProduct = ({product, setProducts}) => {
  const navigate = useNavigate();

    return (
        <div>
        <button className="modifybuttons"
          onClick={async () => {
          setProducts(await deleteProduct({ productId: product.id }))
          navigate(`/fullmenu/${product.category}`);
          location.reload();
          console.log("product deleted!");
            }}>Delete Product</button>
        </div>
        
    )
}

export default DeleteProduct