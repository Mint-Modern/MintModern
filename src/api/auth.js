const baseUrl = "localhost:3000/api";
const token = localStorage.getItem(token);

// =======================Customers Endpoint=======================

// registerCustomer
export const registerCustomer = async (name, phoneNumber, email, password) => {
  //                                  ??????????????????????????????
  try {
    const response = await fetch(`${baseUrl}/customers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phoneNumber,
        email,
        password,
      }),
    });
    const token = (await response.json()).token;
    console.log("THIS IS TOKEN", token);
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
    const token = await response.json();
    return token;
  } catch (error) {
    console.error(error);
  }
};

// =======================Review Endpoint==========================

// getAllReviews

// createNewReview

// updateReview

// attachCustomerToReview

// deleteReview

// =================CustomerReviews Endpoint=======================

// updateCustomerReview

// deleteCustomerReview

// ======================Orders Endpoint===========================

// getAllOrders

// createNewOrder

// updateOrder

// deleteOrder

// ======================Product Endpoint==========================

// getAllProducts

// updateProduct

// attach?ProductToOrder

// deleteProduct

// =====================OrderProduct Endpoint======================

// updateOrderProduct

// deleteOrderProduct
