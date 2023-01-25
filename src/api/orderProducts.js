const {
  getOrderProductById,
  updateOrderProduct,
  destroyOrderProduct,
} = require("../db");
const router = require("./customers");
const { requireCustomer } = require("./utils");

// GET /api/orderProducts
// router.get("/", async (req, res) => {
//     const orderProducts = await (we do not have a getallorderproduct db func)
// })

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
