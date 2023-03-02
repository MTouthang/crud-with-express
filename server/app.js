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
import { home, missingEndPoints } from "./controllers/user.controller.js";

// testing the api
app.use("/ping", home);

// user routes
app.use("/api/v1", userRoute);

// handling the missing route
app.use("*", missingEndPoints);

export default app;
