import express from "express";
import { updateApplies } from "../controllers/applyController.js";

const applyRouter = express.Router();

applyRouter.post("/update", updateApplies);

export default applyRouter;