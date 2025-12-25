import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/", userRoutes);

connectDB();

app.use("/auth", authRoutes);
app.use("/images", imageRoutes);

app.get("/", (_, res) => {
  res.send("Creative Showcase API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
