const { deleteCustomerReview } = require("../db");
const router = require("./customers");
const { requireCustomer } = require("./utils");

// PATCH /api/customerReviews/:customerReviewId
// not sure if we would need this if we have a route in reviews??

// DELETE /api/customerReviews/:customerReviewId
router.delete(
  "./:customerReviewId",
  requireCustomer,
  async (req, res, next) => {
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
      const customerReviewToDelete = await deleteCustomerReview(
        customerReviewId
      );
      res.send(customerReviewToDelete);
    } catch (error) {
      next(error);
    }
  }
);

// I think this is more of an admin thing??

module.exports = router;
