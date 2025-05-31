import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import db from "../config/db.js";

// Create token
function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET);
}

function decodeToken(token) {
  return jwt.decode(token);
}

async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if the email is valid
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Check if the user already exist
    const user = await db.query("SELECT email FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.json({
        success: false,
        message: "User already exists, try looging in instead",
      });
    }

    // Create a new account
    else {
      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Add new user to DB
      const newUser = await db.query(
        "INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id",
        [email, hashedPassword, name]
      );
      const token = createToken(newUser.rows[0].id);
      return res.json({
        success: true,
        message: "User added succesfully",
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function registerFreelancer(req, res) {
  const {
    freelancer,
    name,
    email,
    password,
    phone,
    address,
    category,
    biography,
  } = req.body;
  const profileImage = req.files.profileImage[0].filename;
  const portfolioImages = req.files.portfolioImages.map(
    (file) => file.filename
  );

  try {
    // Check if the email is valid
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Check if the user already exist
    const user = await db.query("SELECT email FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length > 0) {
      return res.json({
        success: false,
        message: "User already exists, try looging in instead",
      });
    }
    // Create a new account
    else {
      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Add new user to DB
      const newUser = await db.query(
        "INSERT INTO users (freelancer, email, password, name, phone, address, category, profile_image, biography, portfolio_images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
        [
          freelancer,
          email,
          hashedPassword,
          name,
          phone,
          address,
          category,
          profileImage,
          biography,
          portfolioImages,
        ]
      );
      const token = createToken(newUser.rows[0].id);
      return res.json({
        success: true,
        message: "User added succesfully",
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the email is valid
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Check if the user exists
    let user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.json({
        success: false,
        message: "User doesn't exist, try to sign up instead",
      });
    }

    user = user.rows[0];

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.json({
        success: false,
        message: "Password incorrect, please try again",
      });
    }

    const token = createToken(user.id);
    res.json({ success: true, message: "User signed in succesfully", token });
  } catch (error) {
    console.log(error);
  }
}

async function getUserId(req, res) {
  const { token } = req.params;
  try {
    const payload = decodeToken(token);
    const userId = payload?.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    res.json({
      success: true,
      message: "Id retrieved successfully",
      userId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error decoding token" });
  }
}

async function getFreelancers(req, res) {
  try {
    const response = await db.query(
      "SELECT id, name, phone, freelancer, category, profile_image, biography, portfolio_images FROM users WHERE freelancer = true"
    );
    const freelancers = response.rows;
    res.json({
      success: true,
      message: "Freelancers retrived succesfully",
      freelancers,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

async function getFreelancer(req, res) {
  try {
    const id = req.param("id");
    const response = await db.query(
      "SELECT id, name, phone, freelancer, category, profile_image, biography, portfolio_images FROM users WHERE id=$1",
      [id]
    );
    const freelancer = response.rows[0];
    res.json({
      success: true,
      message: "Freelancer retrived succesfully",
      freelancer,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
}

export {
  register,
  registerFreelancer,
  login,
  getUserId,
  getFreelancers,
  getFreelancer,
};
