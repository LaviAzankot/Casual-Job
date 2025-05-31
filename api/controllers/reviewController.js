import db from "../config/db.js";

async function addReview(req, res) {
  const { reviewer_id, reviewed_user_id, short_service_desc, review, rating } =
    req.body;

  console.log(req.body);

  try {
    const response = await db.query(
      "INSERT INTO reviews (reviewer_id, reviewed_user_id, short_service_desc, review, rating) VALUES ($1, $2, $3, $4, $5);",
      [reviewer_id, reviewed_user_id, short_service_desc, review, rating]
    );
    return res.json({
      success: true,
      message: "Added user review succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
}

async function editReview(req, res) {
  const {
    id,
    reviewer_id,
    reviewed_user_id,
    short_service_desc,
    review,
    rating,
  } = req.body;

  try {
    const response = await db.query(
      `UPDATE reviews 
   SET short_service_desc = $1, review = $2, rating = $3
   WHERE reviewer_id = $4 AND reviewed_user_id = $5 AND id = $6;`,
      [short_service_desc, review, rating, reviewer_id, reviewed_user_id, id]
    );

    return res.json({
      success: true,
      message: "Edited user review succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
}

async function removeReview(req, res) {
  const { review_id, reviewed_user_id } = req.body;

  try {
    const response = await db.query(
      "DELETE FROM reviews WHERE id = $1 AND reviewed_user_id = $2;",
      [review_id, reviewed_user_id]
    );
    return res.json({
      success: true,
      message: "Removed user review succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
}

async function getReviews(req, res) {
  const { reviewedUserId } = req.params;

  try {
    const response = await db.query(
      "SELECT * FROM reviews WHERE reviewed_user_id = $1;",
      [reviewedUserId]
    );
    const reviews = response.rows;
    return res.json({
      success: true,
      message: "Got reviewed user reviews succesfully",
      reviews,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
}

async function getAvgRating(req, res) {
  const { reviewedUserId } = req.params;

  try {
    const response = await db.query(
      "SELECT AVG(rating) AS average_rating FROM reviews WHERE reviewed_user_id = $1",
      [reviewedUserId]
    );

    const avgRating = Math.floor(response.rows[0].average_rating);

    return res.json({
      success: true,
      message: "Got reviews averege succesfully",
      avgRating,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
}

export { addReview, editReview, removeReview, getReviews, getAvgRating };
