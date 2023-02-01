const client = require("../client");
const { attachProductToOrder } = require("./products");

/*

Tri Approved

createOrder
getOrderById
getAllOrders
getAllOrdersByCustomer

*/

async function createOrder({ userId, total, salesTax, isActive }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      INSERT INTO orders("userId", total, "salesTax", "isActive")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `,
      [userId, total, salesTax, isActive]
    );
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrderById(id) {
  try {
    const {
      rows: [order],
    } = await client.query(`
    SELECT *
    FROM orders
    WHERE id = ${id}
    `);
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM orders;
    `);
    console.log("this is orders API", rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllOrdersByCustomer(customerId) {
  try {
    const { rows: orders } = await client.query(`
    SELECT * FROM orders
    WHERE "userId" = ${customerId};
    `);
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//getOrderByUserIsActive
async function getOrderByUserIsActive(customerId) {
  try {
    console.log(customerId);
    const {
      rows: [order],
    } = await client.query(`
    SELECT * FROM orders
    WHERE "userId" = ${customerId} AND "isActive" = true;
    `);
    return attachProductToOrder(order);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  getAllOrdersByCustomer,
  getOrderByUserIsActive,
};
