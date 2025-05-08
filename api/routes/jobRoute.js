import express from "express";
import { getAllJobs, createJob, getJob, updateJob, deleteJob, getUserJobs } from "../controllers/jobController.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";

const jobRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${file.originalname}`)
    }
})

const upload = multer({storage: storage});

jobRouter.get("/getAll", getAllJobs);
jobRouter.post("/userJobs", authMiddleware, getUserJobs);
jobRouter.post("/create", [upload.single("image"), authMiddleware], createJob);
jobRouter.post("/get", getJob);
jobRouter.post("/update", authMiddleware, updateJob);
jobRouter.post("/delete", authMiddleware, deleteJob);

export default jobRouter;