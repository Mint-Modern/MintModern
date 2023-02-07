import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCustomers } from "../api/auth";
import MyNavbar from "./MyNavbar";

const GetCustomersList = () => {
  const [customers, setCustomers] = useState([]);
  
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getCustomers = async () => {
      const response = await getAllCustomers();
      setCustomers(response);
    };
    getCustomers();
  }, []);

  // console.log(customers);
  
  let customersToMap = customers.map((customer, index) => {
    const isAdmin = customer.isAdmin === true;
    return (
      <div className="single-cust" key={index}>
        <h2>{customer.name}</h2>
        <h3>{customer.email}</h3>
        <h3>{customer.phoneNumber}</h3>
        <h3><i>{isAdmin ? "Admin" : null }</i></h3>
      </div>
    );
  });
  return (
    <>
      <MyNavbar />
      <h1 className="all-cust">Customers List</h1>
      <div className="cust-list">{customersToMap}
        <button className="modifybuttons" onClick={goBack}>Back</button>
      </div>
    </>
  );
};

export default GetCustomersList;
