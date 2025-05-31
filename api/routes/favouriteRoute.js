import express from "express";
import {
  addFavourite,
  removeFavourite,
  getUserFavourite,
} from "../controllers/favouriteController.js";
import authMiddleware from "../middleware/auth.js";

const favouriteRouter = express.Router();

favouriteRouter.post("/add", authMiddleware, addFavourite);
favouriteRouter.post("/get/:favouriteUserId", authMiddleware, getUserFavourite);
favouriteRouter.post("/remove", authMiddleware, removeFavourite);

export default favouriteRouter;
