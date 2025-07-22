import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // Auth routes کو امپورٹ کریں
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

connectDB();

const app = express();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define upload directories
const uploadsDir = path.join(__dirname, "uploads");
const profilesDir = path.join(__dirname, "uploads/profiles");
const postsDir = path.join(__dirname, "uploads/posts");

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log(`Created directory: ${uploadsDir}`);
  }
  if (!fs.existsSync(profilesDir)) {
    fs.mkdirSync(profilesDir, { recursive: true });
    console.log(`Created directory: ${profilesDir}`);
  }
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
    console.log(`Created directory: ${postsDir}`);
  }
} catch (err) {
  console.error("Failed to create upload directories:", err);
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  "/uploads/profiles",
  express.static(path.join(__dirname, "uploads/profiles"))
);
app.use(
  "/uploads/posts",
  express.static(path.join(__dirname, "uploads/posts"))
);

// API Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
