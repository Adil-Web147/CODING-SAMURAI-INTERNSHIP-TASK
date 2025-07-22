import express from "express";
import {
  registerUser,
  loginUser,
  uploadProfilePic,
  getUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  uploadProfilePic.single("profilePicture"),
  registerUser
);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

export default router;
