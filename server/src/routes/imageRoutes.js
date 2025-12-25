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

router.get("/random", getRandomImages);
router.get("/user/:username", getImagesByUsername);
router.get("/my", auth, getMyImages);
router.post("/", auth, upload.single("image"), uploadImage);
// Alias to support clients posting to /images/upload
router.post("/upload", auth, upload.single("image"), uploadImage);
router.delete("/:id", auth, deleteImage);

export default router;
