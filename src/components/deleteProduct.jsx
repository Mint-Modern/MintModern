import React from "react";
import { deleteProduct } from "../api/auth";

const DeleteProduct = ({product, products, setProducts}) => {
    return (
        <div>
            <button onClick={async () => {
                const deleteProd = await deleteProduct(product)
                // console.log("PRODUCT TO DELETE", deleteProd)
                const reloadMenu = () => {
                    window.location.href = "/fullmenu"
                };
                reloadMenu();
                
            }}>Delete Product</button>
        </div>
    )
}

export default DeleteProduct