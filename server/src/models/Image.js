import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
