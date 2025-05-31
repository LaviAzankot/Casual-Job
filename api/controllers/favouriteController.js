import db from "../config/db.js";

async function addFavourite(req, res) {
  const { user_id, favourite_user_id } = req.body;

  try {
    const response = await db.query(
      "INSERT INTO user_favourites (user_id, favourite_user_id) VALUES ($1, $2);",
      [user_id, favourite_user_id]
    );
    return res.json({
      success: true,
      message: "Added user favourite succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
}

async function removeFavourite(req, res) {
  const { user_id, favourite_user_id } = req.body;

  try {
    const response = await db.query(
      "DELETE FROM user_favourites WHERE user_id = $1 AND favourite_user_id = $2;",
      [user_id, favourite_user_id]
    );
    return res.json({
      success: true,
      message: "Removed user favourite succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
    });
  }
}

async function getUserFavourite(req, res) {
  const { favouriteUserId } = req.params;
  // Get userId from either req.body.userId or from auth middleware
  const userId = req.body.userId || req.body.user_id;

  console.log("Checking favorite:", { userId, favouriteUserId });

  try {
    const response = await db.query(
      "SELECT * FROM user_favourites WHERE user_id = $1 AND favourite_user_id = $2;",
      [userId, favouriteUserId]
    );

    // Check if any rows were returned
    const isFavorite = response.rows.length > 0;

    console.log("Favorite check result:", isFavorite);

    return res.json({
      success: true,
      message: "Got user favourite successfully",
      favourite: isFavorite,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
}

export { addFavourite, removeFavourite, getUserFavourite };
