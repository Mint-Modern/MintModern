const express = require("express");
const router = express.Router();
const { requireCustomer } = require("./utils");
const {
  createOrder,
  getOrderById,
  getAllOrders,
  getAllOrdersByCustomer,
  addProductToOrder,
} = require("../db");

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:orderId
router.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:customerId/orders
router.get("/:customerId/orders", async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const orders = await getAllOrdersByCustomer(customerId);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

// POST /api/orders
router.post("/", requireCustomer, async (req, res, next) => {
  const { userId, total, salesTax, isActive } = req.body;
  const orderData = {};

  orderData.userId = userId;
  orderData.total = total;
  orderData.salesTax = salesTax;
  orderData.isActive = isActive;

  try {
    const order = await createOrder(orderData);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// POST /api/orders/:orderId/products
router.post("/:orderId/products", async (req, res, next) => {
  const { orderId } = req.params;
  const { productId } = req.body;

  try {
    const productToAdd = await addProductToOrder({
      orderId,
      productId,
      quantity: 1,
    });
    res.send(productToAdd);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orders/:orderId
router.delete("/:orderId", requireCustomer, async (req, res, next) => {
  const { orderId } = req.params;

  const order = await getOrderById(orderId);
  if (!order) {
    next({
      error: "orderDoesNotExist",
      message: `order ${orderId} not found`,
      name: `${orderId}`,
    });
  }

  try {
    const orderToDelete = await deleteOrder(orderId);
    res.send(orderToDelete);
  } catch (error) {
    next(error);
  }
});

// do we need another delete to delete the product from the order????

module.exports = router;
