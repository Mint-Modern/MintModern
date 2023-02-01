const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductById,
  getProductByName,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../db");
// const { requireCustomer } = require("./utils");

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// POST /api/products
router.post("/", async (req, res, next) => {
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
    console.log("PRODUCT DATA", productData);
    const product = await createProduct(productData);
    console.log("PRODUCT", product);
    // ASK TRI WHY SENDS BACK EMPTY OBJECT BUT DOES UPDATE THE DATABASE
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//PATCH /api/products/:productId
router.patch("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { name, description, category, price } = req.body;
  console.log("REQ PARAMS", req.params);
  const fields = {};

  if (req.body.name) {
    fields.name = name;
  }
  if (req.body.description) {
    fields.description = description;
  }
  if (req.body.category) {
    fields.category = category;
  }
  if (req.body.price) {
    fields.price = price;
  }

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
router.delete("/:productId", async (req, res, next) => {
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

module.exports = router;
