import cloudinary from "../config/cloudinary.js";

// upload base64 image
export const uploadOnCloudinary = async (base64Image) => {
  if (!base64Image) return null;

  return await cloudinary.uploader.upload(base64Image, {
    folder: "creative-showcase",
    resource_type: "image",
  });
};

// delete image
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return await cloudinary.uploader.destroy(publicId);
};
