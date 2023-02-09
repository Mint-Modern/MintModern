const client = require("../client");

async function createReview({ name, description, rating, userId }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    INSERT INTO reviews(name, description, rating, "userId")
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [name, description, rating, userId]
    );
    return review;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllReviews() {
  try {
    const { rows: reviews } = await client.query(`
    SELECT * FROM reviews
    `);
    return reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getReviewById(id) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    SELECT * FROM reviews
    WHERE id = $1
    `,
      [id]
    );
    return review;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//======================= CHECK THIS ONE ======================
async function attachReviewToCustomer(customers) {
  const customersToReturn = [...customers];

  try {
    const { rows: reviews } = await client.query(`
    SELECT reviews.*, customerReviews.id AS "customerReviewId", customerReviews."userId"
    FROM reviews
    JOIN customerReviews ON customerReviews."reviewId" = reviews.id;
    `);

    for (const customer of customersToReturn) {
      const reviewsToAdd = reviews.filter(
        (review) => review.userId === customer.id
      );

      customer.reviews = reviewsToAdd;
    }
    return customersToReturn;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//======================= CHECK THIS ONE ======================
async function updateReview({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    // update any fields that need to be updated
    if (setString.length > 0) {
      const {
        rows: [review],
      } = await client.query(
        `
            UPDATE reviews
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
          `,
        Object.values(fields)
      );
      return review;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteReview(id) {
  try {
    const {
      rows: [reviews],
    } = await client.query(
      `
          DELETE FROM reviews
          WHERE id = ${id}
          RETURNING *;
          
        `
    );
    return reviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  attachReviewToCustomer,
  updateReview,
  deleteReview,
};
