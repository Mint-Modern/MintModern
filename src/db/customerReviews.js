const client = require("./client");

/*

Tri Approved

addReviewToCustomer
getCustomerReviewById
updateCustomerReview
deleteCustomerReview

*/

async function addReviewToCustomer({ userId, reviewId }) {
  try {
    const {
      rows: [customerReview],
    } = await client.query(
      `
    INSERT INTO customerreviews
    ("userId", "reviewId")
    ON CONFLICT ("userId", "reviewId") DO NOTHING
    RETURNING *;
    `,
      [userId, reviewId]
    );
    return customerReview;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCustomerReviewById(id) {
  try {
    const {
      rows: [customerReviews],
    } = await client.query(`
    SELECT *
    FROM customerreviews
    WHERE id = ${id}
    `);
    return customerReviews;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCustomerReview({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  try {
    const {
      rows: [customerreview],
    } = await client.query(
      `
      UPDATE customerreviews SET ${setString}
      WHERE id = ${id}
      RETURNING *;
    `,
      Object.values(fields)
    );
    return customerreview;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteCustomerReview(id) {
  try {
    const {
      rows: [customerreview],
    } = await client.query(`
    DELETE FROM customerreviews
    WHERE id = ${id}
    RETURNING *;
    `);
    return customerreview;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  addReviewToCustomer,
  getCustomerReviewById,
  updateCustomerReview,
  deleteCustomerReview,
};
