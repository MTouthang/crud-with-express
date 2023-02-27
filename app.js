import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/db.js";

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// db connection
connectDatabase();

// import route
import userRoute from "./routes/user.route.js";
app.use("/api/v1", userRoute);

export default app;
