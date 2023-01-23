const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductById,
  getProductByName,
  //?????
  attachProductToOrder,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../db");
const { requireCustomer } = require("./utils");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// POST /api/products
router.post("/", requireCustomer, async (req, res, next) => {
  const { name, description, category, price } = req.body;
  const products = await getAllProducts();
  const productData = {};

  productData.name = name;
  productData.description = description;
  productData.category = category;
  productData.price = price;

  try {
    for (const product of products) {
      if (product.name === productData.name) {
        next({
          error: "ProductExistsError",
          message: `A product with name ${name} already exists`,
          name: `${name}`,
        });
      }
    }

    const product = createProduct(productData);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//PATCH /api/products/:productId
router.patch("./:productId", requireCustomer, async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, category, price } = req.body;
  const fields = {};

  fields.name = name;
  fields.description = description;
  fields.category = category;
  fields.price = price;

  const product = await getProductById(productId);
  if (!product) {
    next({
      error: "ProductDoesNotExist",
      message: `Product ${productId} not found`,
      name: `${productId}`,
    });
  }

  const checkProductName = await getProductByName(name);
  if (checkProductName) {
    next({
      error: "Error",
      message: `A product with name ${name} already exists`,
      name: `${checkProductName}`,
    });
  }

  try {
    const update = await updateProduct({ id: productId, ...fields });
    res.send(update);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/products/:productId
router.delete("./:productId", requireCustomer, async (req, res, next) => {
  const { productId } = req.params;

  const product = await getProductById(productId);
  if (!product) {
    next({
      error: "ProductDoesNotExist",
      message: `Product ${productId} not found`,
      name: `${productId}`,
    });
  }

  try {
    const productToDelete = await deleteProduct(productId);
    res.send(productToDelete);
  } catch (error) {
    next(error);
  }
});

// POST /api/orders/:orderId/products ???

module.exports = router;
