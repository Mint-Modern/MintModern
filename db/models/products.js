const client = require("../client");

/*

Tri Approved

createProduct **
getProductById **
getProductByName *maybe **
attachProductToOrder **
getAllProducts **
updateProduct **
deleteProduct **

*/

async function createProduct({ name, description, category, price, image }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(name, description, category, price, image)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
      [name, description, category, price, image]
    );
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(`
    SELECT * FROM products
    WHERE id = ${id};
    `);
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProductByName(name) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT *
    FROM products
    WHERE name = $1
    `,
      [name]
    );
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//======================= CHECK THIS ONE ======================
async function attachProductToOrder(order) {
  try {
    const { rows: products } = await client.query(`
      SELECT products.*, orderProducts.id AS "orderProductId", orderProducts."orderId", orderProducts.quantity
      FROM products
      JOIN orderProducts ON orderProducts."productId" = products.id;
      `);

    const productsToAdd = products.filter(
      (product) => product.orderId === order.id
    );

    if (productsToAdd.length) {
      order.products = productsToAdd;
    }

    console.log(order);

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
    SELECT * FROM products
    `);
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    // update any fields that need to be updated
    if (setString.length > 0) {
      const {
        rows: [product],
      } = await client.query(
        `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
          `,
        Object.values(fields)
      );
      return product;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteProduct(id) {
  try {
    const {
      rows: [products],
    } = await client.query(
      `
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *;

    `
    );
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductById,
  getProductByName,
  attachProductToOrder,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
