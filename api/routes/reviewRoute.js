import express from "express";
import {
  addReview,
  editReview,
  removeReview,
  getReviews,
  getAvgRating,
} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", addReview);
reviewRouter.post("/edit", editReview);
reviewRouter.post("/remove", removeReview);
reviewRouter.get("/getReviews/:reviewedUserId", getReviews);
reviewRouter.get("/getAvgRating/:reviewedUserId", getAvgRating);

export default reviewRouter;
