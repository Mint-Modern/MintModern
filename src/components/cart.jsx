import React from "react";

const Cart = ({ orderProducts, orders, products }) => {
  let orderProductsToMap = orderProducts?.map((orderProduct, index) => {
    let ordersToMap = orders?.map((order, index) => {
      if (order.id === orderProduct.orderId && order.isActive === true) {
        let productsToMap = products?.map((product, index) => {
          if (product.id === orderProduct.productId) {
            return (
              <div className="orderproducts" key={index}>
                <h4>{product.name}</h4>
              </div>
            );
          }
        });
        return <div>{productsToMap}</div>;
      }
      return <div key={index}>{ordersToMap}</div>;
    });
  });
  return (
    <>
      <div>{orderProductsToMap}</div>
    </>
  );
};

export default Cart;
