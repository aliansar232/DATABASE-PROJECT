import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";

import adminRouter from "./routes/admin.routes.js";

app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});
app.use(cors({ origin: ["http://127.0.0.1:5501"], credentials: true }));

app.use("/api/v1", adminRouter);

export default app;
