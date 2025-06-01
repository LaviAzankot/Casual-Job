import express from "express";
import {
  addReview,
  editReview,
  removeReview,
  getReviews,
  getAvgRating,
} from "../controllers/reviewController.js";
import { authPublicMiddleware } from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authPublicMiddleware, addReview);
reviewRouter.post("/edit", authPublicMiddleware, editReview);
reviewRouter.post("/remove", authPublicMiddleware, removeReview);
reviewRouter.get(
  "/getReviews/:reviewedUserId",
  authPublicMiddleware,
  getReviews
);
reviewRouter.get("/getAvgRating/:reviewedUserId", getAvgRating);

export default reviewRouter;
