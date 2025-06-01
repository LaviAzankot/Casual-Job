import express from "express";
import {
  addFavourite,
  removeFavourite,
  getUserFavourite,
  listUserFavourites,
} from "../controllers/favouriteController.js";
import { authPublicMiddleware } from "../middleware/auth.js";

const favouriteRouter = express.Router();

favouriteRouter.post("/add", authPublicMiddleware, addFavourite);
favouriteRouter.post(
  "/get/:favouriteUserId",
  authPublicMiddleware,
  getUserFavourite
);
favouriteRouter.post("/remove", authPublicMiddleware, removeFavourite);
favouriteRouter.get("/list", authPublicMiddleware, listUserFavourites);

export default favouriteRouter;
