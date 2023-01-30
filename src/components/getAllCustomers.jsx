import React, { useEffect, useState } from "react";
import { getAllCustomers } from "../api/auth";

const getAllCustomers = () => {
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        const getCustomers = async () => {
          const response = await getAllCustomers();
          setCustomers(response);
        };
        getCustomers();
      }, []);
    console.log(customers)
    let customersToMap = customers.map((customer, index) => {
        return (
            <div className="customers" key={index}>
                <h2>{customer.name}</h2>
                <h3>{customer.email}</h3>
                <h3>{customer.phoneNumber}</h3>
                <h3>{customer.isAdmin}</h3>
            
            </div>
        );
    });
    return (
        <>
            <h1>Customers</h1>
            <div>{customersToMap}</div>
        </>
    );
};

export default getAllCustomers;

