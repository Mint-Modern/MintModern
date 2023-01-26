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

// GET /api/orderProducts
// router.get("/", requireCustomer, async (req, res, next) => {
//     const getOrderByCustomer = await (we do not have a getallorderproduct db func)
// })

// post /api/orderProducts
router.post("/", requireCustomer, async (req, res, next) => {
  const { customerId } = req.params;
  const order = await getOrderByUserIsActive(customerId);
  const { productId, orderId, quantity } = req.body;

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

// PATCH /api/orderProducts/:orderProductId
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
