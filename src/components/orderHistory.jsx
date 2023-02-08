import React from "react";
import Locationhours from "./locationHours";

const OrderHistory = ({ orders, user }) => {
    console.log("getting orders", orders);

    console.log(user)
    return (
      <>
        <h1>Order History</h1>
        <div>
          {orders.length
                    ? orders.map((order, index) => {
                return (
                  <div className="orders" key={index}>
                        <h2>Order Number : {order.id}</h2>
                        <h3>Tax : {order.salesTax}</h3>
                        <h3>Total : {order.total}</h3>
                        
                    <h3>
                      products :
                      {order.product
                                ? order.product.map((product, index) => {
                            console.log("product", product)
                            return (
                              <div key={index}>
                                    <h5>Name : {product.name}</h5>
                                    <h5>Description : {product.description}</h5>
                                    <h5>Quantity : {product.quantity}</h5>
                                    <h5>Total : {product.total}</h5>

                              </div>
                            );
                          })
                        : null}
                    </h3>
                  </div>
                );
              })
            : null}
        </div>
      <Locationhours/>
      </>
    );
  };

export default OrderHistory;