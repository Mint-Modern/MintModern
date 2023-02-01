// import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
// import { fetchMe } from "../api/auth";


// const IsAdmin = ({ setToken }) => {
//     const token = localStorage.getItem("token");
//     const [customer, setCustomer] = useState({});

//     if (token) {
//         useEffect(() => {
//             const getCustomer = async () => {
//                 const response = await fetchMe(token);
//                 setCustomer(response);
//             };
//             getCustomer();
//         }, [token]);
//     }

//     const isAdmin = customer.isAdmin === true;
//     console.log("customer", customer);

//     return isAdmin ? (
//         <div className="my-nav admin">
//             <Link to={"/allcustomers"}>All Customers</Link>
//             <Link to={"/newproduct"}>Add New Products</Link>
//         </div>
//     ) : (
//             null
//     )
// }

// export default IsAdmin;