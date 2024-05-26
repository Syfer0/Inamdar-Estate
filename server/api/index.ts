import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";
import authRouter from "./routes/auth.route";
import listingRouter from "./routes/listing.route";
import cookieParser from "cookie-parser";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { NextFunction, Request, Response } from "express";

dotenv.config();

mongoose
  .connect(process.env.MONGO ?? "defaultMongoConnection")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const projectRoot = path.resolve();
app.use(express.json());
app.use(cookieParser());

// Define a proxy for the Vite development server
const viteProxy = createProxyMiddleware("/client", {
  target: "inamdar-estate.vercel.app",
  changeOrigin: true,
});
app.use(viteProxy);

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Server the index.html from the Vite development server
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
