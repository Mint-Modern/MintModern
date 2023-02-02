import React from "react";
import { deleteProduct } from "../api/auth";

const DeleteProduct = ({product, products, setProducts}) => {
    return (
        <div>
            <button onClick={async () => {
                setProducts(await deleteProduct(product))
                const reloadMenu = () => {
                    window.location.href = "/fullmenu"
                };
                reloadMenu();
                
            }}>Delete Product</button>
        </div>
    )
}

export default DeleteProduct