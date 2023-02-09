const { deleteCustomerReview } = require("../db");
const router = require("./customers");
const { requireCustomer } = require("./utils");

// DELETE /api/customer_reviews/:customerReviewId
router.delete("/:customerReviewId", requireCustomer, async (req, res, next) => {
  const { customerReviewId } = req.params;

  const customerReview = await deleteCustomerReview(customerReviewId);
  if (!customerReview) {
    next({
      error: "NoCustomerReviewError",
      message: `A review with name ${customerReview} does not exist`,
      name: `${customerReview}`,
    });
  }
  try {
    const customerReviewToDelete = await deleteCustomerReview(customerReviewId);
    res.send(customerReviewToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
