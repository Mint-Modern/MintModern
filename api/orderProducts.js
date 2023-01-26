const {
  getOrderProductById,
  updateOrderProduct,
  destroyOrderProduct,
  getOrderByUserIsActive,
  attachProductToOrder,
  addProductToOrder,
} = require("../db");
const router = require("./customers");
const { requireCustomer } = require("./utils");

// GET /api/order_products/:customerId
router.get("/:customerId", requireCustomer, async (req, res, next) => {
  const { customerId } = req.params;
  try {
    const getOrderByCustomer = await getOrderByUserIsActive(customerId);
    res.send(getOrderByCustomer);
  } catch (error) {
    next(error);
  }
});

// post /api/order_products/:customerId
router.post("/:productId", requireCustomer, async (req, res, next) => {
  const order = await getOrderByUserIsActive(req.customer.id);
  console.log(order);
  const orderId = order[0].id;
  const quantity = 1;
  const { productId } = req.params;

  try {
    const orderWithProduct = await addProductToOrder({
      productId,
      orderId,
      quantity,
    });

    res.send(orderWithProduct);
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// PATCH /api/order_products/:orderProductId
router.patch("/:orderProductId", requireCustomer, async (req, res, next) => {
  const { orderProductId } = req.params;
  const { orderId, productId, quantity } = req.body;
  const fields = {};

  fields.quantity = quantity;

  const orderProduct = await getOrderProductById(orderProductId);
  if (!orderProduct) {
    next({
      error: "NoOrderProductError",
      message: `A product with name ${orderProductId} does not exist`,
      name: `${orderProduct}`,
    });
  }

  try {
    const update = await updateOrderProduct({ id: orderProductId, ...fields });
    res.send(update);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orderProducts/:orderProductId
router.delete("/:orderProductId", requireCustomer, async (req, res, next) => {
  const { orderProductId } = req.params;

  const orderProduct = await getOrderProductById(orderProductId);
  if (!orderProduct) {
    next({
      error: "NoOrderProductError",
      message: `A product with id ${orderProductId} does not exist`,
      name: `${orderProduct}`,
    });
  }
  try {
    const orderProductToDelete = await destroyOrderProduct(orderProductId);
    res.send(orderProductToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
