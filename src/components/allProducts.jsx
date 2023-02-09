// // DONT THINK WE NEED THIS

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAllProducts } from "../api/auth";

// const allProducts = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getProducts = async () => {
//       const response = await getAllProducts();
//       setProducts(response);
//     };
//     getProducts();
//   }, []);

//   let productsToMap = products?.map((product, index) => {
//     return (
//       <div className="single-prod" key={index}>
//         <h4>{product.name}</h4>
//         <h5>
//           <i>{product.description}</i>
//         </h5>
//         <h5>| {product.price} |</h5>
//         <button
//           onClick={() => {
//             navigate(`/products/${product.id}`);
//           }}
//         >
//           Edit Product
//         </button>
//       </div>
//     );
//   });

//   return (
//     <>
//       <div className="adminProducts">{productsToMap}</div>
//     </>
//   );
// };

// export default allProducts;
