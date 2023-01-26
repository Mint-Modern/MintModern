const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getCustomerReviewById,
} = require("../db");
const { requireCustomer } = require("./utils");

// GET api/reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

//POST /api/reviews
router.post("/", requireCustomer, async (req, res, next) => {
  const { name, description, rating, userId } = req.body;
  const reviewData = {};

  reviewData.name = name;
  reviewData.description = description;
  reviewData.rating = rating;
  reviewData.userId = userId;

  console.log(userId);
  try {
    const review = await createReview(reviewData);
    res.send(review);
  } catch (error) {
    next(error);
  }
});

//PATCH /api/reviews/:reviewId
router.patch("/:reviewId", requireCustomer, async (req, res, next) => {
  const { reviewId } = req.params;
  const { name, description, rating } = req.body;
  const fields = {};

  if (req.body.name) {
    fields.name = name;
  }
  if (req.body.description) {
    fields.description = description;
  }
  if (req.body.rating) {
    fields.rating = rating;
  }

  const review = await getReviewById(reviewId);
  if (!review) {
    next({
      error: "ReviewDoesNotExist",
      message: `Review ${reviewId} not found`,
      name: `${reviewId}`,
    });
  }

  try {
    const update = await updateReview({ id: reviewId, ...fields });
    res.send(update);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/reviews/:reviewId
router.delete("/:reviewId", requireCustomer, async (req, res, next) => {
  const { reviewId } = req.params;

  const review = await getReviewById(reviewId);
  if (!review) {
    next({
      error: "ReviewDoesNotExist",
      message: `Review ${reviewId} not found`,
      name: `${reviewId}`,
    });
  }

  try {
    const reviewToDelete = await deleteReview(reviewId);
    res.send(reviewToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
