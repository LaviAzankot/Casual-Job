import express from "express";
import { updateFavs } from "../controllers/favouriteController.js";

const favouriteRouter = express.Router();

favouriteRouter.post("/update", updateFavs);

export default favouriteRouter;