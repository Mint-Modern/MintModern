const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getCustomerById } = require("../db");

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getCustomerById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization Token must start with ${prefix}`,
    });
  }
});

// DON'T WE NEED TO USE THIS ROUTERS FOR EACH SPECIFIC ROUTES?

// ROUTER: api/customers
const customersRouter = require("./customers");
router.use("/customers", customersRouter);

// ROUTER: api/products
const productsRouter = require("./products");
router.use("/products", productsRouter);

//ROUTER: api/customerReviews
const customerReviewsRouter = require("./customerReviews");
router.use("/customer_reviews", customerReviewsRouter);

//ROUTER: api/orders
const ordersRouter = require("./orders");
router.use("/orders", ordersRouter);

//ROUTER: api/orderProducts
const orderProductsRouter = require("./orderProducts");
router.use("/order_products", orderProductsRouter);

//ROUTER: api/reviews
const reviewsRouter = require("./reviews");
router.use("/reviews", reviewsRouter);

module.exports = router;
