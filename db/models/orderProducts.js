const client = require("../client");

/*

Tri Approved

addProductToOrder
getOrderProductById
updateOrderProduct
destroyOrderProduct

SHOULD WE DO addProductToOrder AS WELL?

*/

// async function attachProductToOrder() {
//   try {
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

async function addProductToOrder({ orderId, productId, quantity }) {
  try {
    const {
      rows: [orderProduct],
    } = await client.query(
      `
    INSERT INTO orderProducts
    ("orderId", "productId", quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT ("orderId", "productId") DO NOTHING
    RETURNING *;
    `,
      [orderId, productId, quantity]
    );
    return orderProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getOrderProductById(id) {
  try {
    const {
      rows: [orderProducts],
    } = await client.query(`
    SELECT *
    FROM orderproducts
    WHERE id = ${id};
    `);
    return orderProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllOrderProducts() {
  try {
    const { rows: orderProducts } = await client.query(`
            SELECT * FROM orderProducts
            `);
    return orderProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateOrderProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    const {
      rows: [orderproduct],
    } = await client.query(
      `
    UPDATE orderproducts SET ${setString}
    WHERE id = ${id}
    RETURNING *;
    `,
      Object.values(fields)
    );
    return orderproduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function destroyOrderProduct(id) {
  try {
    const {
      rows: [orderproduct],
    } = await client.query(`
    DELETE FROM orderproducts
    WHERE id = ${id}
    RETURNING *;
    `);
    return orderproduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  // attachProductToOrder,
  addProductToOrder,
  getOrderProductById,
  updateOrderProduct,
  destroyOrderProduct,
  getAllOrderProducts,
};
