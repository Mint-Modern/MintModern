const client = require("./client");

/*

Tri Approved

createProduct **
getProductById **
getProductByName *maybe
attachProductToOrder
getAllProducts
updateProduct
deleteProduct

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
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function attachProductToOrder() {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getAllProducts() {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function updateProduct() {
  try {
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function deleteProduct() {
  try {
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
