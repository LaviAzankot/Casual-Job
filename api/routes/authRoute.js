import express from "express";
import {
  register,
  login,
  getFreelancers,
  registerFreelancer,
  getFreelancer,
  getUserId,
} from "../controllers/authController.js";
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
  { name: "portfolioImages", maxCount: 6 },
]);

authRouter.post("/register", register);
authRouter.post("/registerFreelancer", uploadFields, registerFreelancer);
authRouter.post("/login", login);
authRouter.get("/getUserId/:token", getUserId);
authRouter.get("/getFreelancers", getFreelancers);
authRouter.get("/getFreelancer/:id", getFreelancer);

export default authRouter;
