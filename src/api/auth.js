const baseUrl = "http://localhost:8080/api";
// const token = localStorage.getItem(token);

// =======================Customers Endpoint=======================

// registerCustomer
export const registerCustomer = async (
  name,
  password,
  email,
  phoneNumber
  // isAdmin = false
) => {
  try {
    const response = await fetch(`${baseUrl}/customers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email, phoneNumber }),
    });
    const token = (await response.json()).token;
    return token;
  } catch (error) {
    console.error(error);
  }
};

// fetchme
export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/customers/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// customerLogin
export const customerLogin = async (name, password) => {
  try {
    const response = await fetch(`${baseUrl}/customers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });
    console.log(response);
    const token = await response.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCustomers = async () => {
  try {
    const response = await fetch(`${baseUrl}/customers`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// =======================Review Endpoint==========================

// getAllReviews
export const getAllReviews = async () => {
  try {
    const response = await fetch(`${baseUrl}/reviews`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// createNewReview
export const createNewReview = async (name, description, rating) => {
  try {
    const response = await fetch(`${baseUrl}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        rating,
      }),
    });
    console.log("createReviews: ", name, description, rating);
    const data = await response.json();
    console.log("dataCreateActivity", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// updateReview
export const updateReview = async (name, description, rating, userId) => {
  try {
    // ask tri if this needs a reviewId
    const response = await fetch(`${baseUrl}/reviews/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name,
        description,
        rating,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// attachCustomerToReview
export const attachCustomerToReview = async ({
  userId,
  reviewId,
  // ask tri if this needs a description and name??? maybe already attached...
}) => {
  console.log("attachActivity", userId, reviewId);
  try {
    const response = await fetch(`${baseUrl}/routines/${reviewId}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        reviewId,
      }),
    });
    console.log(response.body);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// deleteReview
export const deleteReview = async (orderId) => {
  try {
    const response = await fetch(`${baseUrl}/reviews/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// =================CustomerReviews Endpoint=======================

// updateCustomerReview
export const updateCustomerReview = async (
  customerReviewId,
  userId,
  reviewId
  // ask tri if this also needs name, description..
) => {
  console.log(
    "user&reviewId in updateCusRev auth: ",
    customerReviewId,
    userId,
    reviewId
  );
  try {
    const response = await fetch(
      `${baseUrl}/customer_review/${customerReviewId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          reviewId,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
// deleteCustomerReview
export const deleteCustomerReview = async (customerReviewId) => {
  console.log(customerReviewId);
  try {
    const response = await fetch(
      `${baseUrl}/customer_reviews/${customerReviewId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ======================Orders Endpoint===========================

// getAllOrders
export const getAllOrders = async () => {
  try {
    const response = await fetch(`${baseUrl}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getActiveOrderByCustomer = async (customerId) => {
  try {
    const response = await fetch(`${baseUrl}/orders/${customerId}/orders`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrderProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/order_products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// createNewOrder
export const createNewOrder = async ({ userId, total, salesTax, isActive }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        total,
        salesTax,
        isActive,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// updateOrder
export const updateOrder = async ({ orderId, total, salesTax, isActive }) => {
  console.log(orderId, salesTax, isActive, total);
  try {
    const response = await fetch(`${baseUrl}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total,
        salesTax,
        isActive,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// deleteOrder
export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${baseUrl}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// ======================Product Endpoint==========================

// getAllProducts
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// createNewProduct
export const createNewProduct = async ({
  name,
  description,
  category,
  price,
}) => {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        category,
        price,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// updateProduct
export const updateProduct = async (
  name,
  description,
  category,
  price,
  productId
) => {
  // console.log("i am product", name, description, category, price, productId);
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        category,
        price,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSingleProduct = async (productId) => {
  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// attach?ProductToOrder
export const attachProductToOrder = async ({ productId }) => {
  // console.log("attachProductToOrder in auth", orderId, productId, quantity);
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${baseUrl}/order_products/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// deleteProduct
export const deleteProduct = async ({ productId }) => {
  console.log("PRODUCT ID", productId);
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${baseUrl}/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("prod to delete", response);
    // return "product deleted";
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
// =====================OrderProduct Endpoint======================

// updateOrderProduct

export const updateOrderProduct = async (orderProductId, quantity) => {
  console.log("updateOrderProduct in auth: ", orderProductId, quantity);
  try {
    const response = await fetch(
      `${baseUrl}/order_products/${orderProductId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// deleteOrderProduct

export const deleteOrderProduct = async (orderProductId) => {
  console.log("orderProductId in auth: ", orderProductId);

  try {
    const response = await fetch(
      `${baseUrl}/order_products/${orderProductId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
