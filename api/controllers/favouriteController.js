import db from "../config/db.js";

async function addFavourite(req, res) {
  const { userId, favourite_user_id } = req.body;

  try {
    const response = await db.query(
      "INSERT INTO user_favourites (user_id, favourite_user_id) VALUES ($1, $2);",
      [userId, favourite_user_id]
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
  const { userId, favourite_user_id } = req.body;

  try {
    const response = await db.query(
      "DELETE FROM user_favourites WHERE user_id = $1 AND favourite_user_id = $2;",
      [userId, favourite_user_id]
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
  const userId = req.body.userId;

  try {
    const response = await db.query(
      "SELECT * FROM user_favourites WHERE user_id = $1 AND favourite_user_id = $2;",
      [userId, favouriteUserId]
    );

    // Check if any rows were returned
    const isFavorite = response.rows.length > 0;

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

async function listUserFavourites(req, res) {
  const userId = req.body.userId;

  try {
    const response = await db.query(
      `SELECT u.id, u.name, u.phone, u.freelancer, u.category, 
              u.profile_image, u.biography, u.portfolio_images
       FROM users u
       JOIN user_favourites uf ON u.id = uf.favourite_user_id
       WHERE uf.user_id = $1`,
      [userId]
    );

    const favourites = response.rows;
    return res.json({ success: true, favourites });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" });
  }
}

export { addFavourite, removeFavourite, getUserFavourite, listUserFavourites };
