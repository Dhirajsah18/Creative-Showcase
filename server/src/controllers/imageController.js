import Image from "../models/Image.js";
import User from "../models/User.js";
import fs from "fs";
import path from "path";

// GET RANDOM IMAGES

export const getRandomImages = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 9;
    const images = await Image.aggregate([{ $sample: { size: limit } }]);
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load images" });
  }
};


  //GET IMAGES BY USERNAME

export const getImagesByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const images = await Image.find({ user: user._id })
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user images" });
  }
};


// GET MY IMAGES (authenticated user's gallery)
export const getMyImages = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const images = await Image.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load your images" });
  }
};


//   UPLOAD IMAGE

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Ensure required username field is populated
    const user = await User.findById(req.userId).select("username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const image = await Image.create({
      user: req.userId,
      username: user.username,
      imageUrl: `/uploads/${req.file.filename}`
    });

    res.status(201).json(image);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};


//   DELETE IMAGE

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (image.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const filePath = path.join(
      process.cwd(),
      "uploads",
      path.basename(image.imageUrl)
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await image.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed" });
  }
};
