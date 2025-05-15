import express from "express";
import { register, login } from "../controllers/authController.js";
import multer from "multer";

const authRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Handle profileImage and profolioImages upload
const uploadFields = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "profolioImages", maxCount: 6 },
]);

authRouter.post("/register", uploadFields, register);
authRouter.post("/login", login);

export default authRouter;
