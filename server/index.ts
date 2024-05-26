import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import listingRouter from "./routes/listing.route";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { NextFunction, Request, Response } from "express";

dotenv.config();

const mongoUri = process.env.MONGO;
if (!mongoUri) {
  throw new Error("MONGO environment variable is not defined");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

const app = express();
const projectRoot = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

const staticPath = path.join(projectRoot, "client", "dist");
app.use(express.static(staticPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
