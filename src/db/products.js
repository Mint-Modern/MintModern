const client = require("./client");
const { getOrderById } = require("./orders");

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

async function createProduct({ name, description, category, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products(name, description, category, price)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [name, description, category, price]
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
async function attachProductToOrder(orderId) {
  const orderToReturn = getOrderById(orderId);
  try {
    const { rows: products } = await client.query(`
      SELECT products.*, orderProducts.id AS "orderProductId", orderProduct."productId"
      FROM products
      JOIN orderProducts ON orderProducts."productId" = products.id;
      `);

    const productsToAdd = products.filter(
      (product) => product.orderId === orderToReturn.id
    );

    orderToReturn.products = productsToAdd;

    return orderToReturn;
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
        Object.values(product)
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
        DELETE FROM reviews
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
