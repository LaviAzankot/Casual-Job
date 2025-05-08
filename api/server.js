import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import dotenv from "dotenv";
import jobRouter from "./routes/jobRoute.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));
dotenv.config();

db.connect();


app.use("/images", express.static('uploads'));
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobRouter);

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}/`)
})