import express from "express";
import auth from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import {
  getRandomImages,
  getImagesByUsername,
  getMyImages,
  uploadImage,
  deleteImage
} from "../controllers/imageController.js";

const router = express.Router();

router.get("/random", getRandomImages); // GET RANDOM IMAGES
router.get("/user/:username", getImagesByUsername); // GET IMAGES BY USERNAME
router.get("/my", auth, getMyImages); // GET MY IMAGES (authenticated user's gallery)
// UPLOAD IMAGE
router.post("/upload", auth, upload.single("image"), uploadImage);
// DELETE IMAGE
router.delete("/:id", auth, deleteImage);

export default router;
