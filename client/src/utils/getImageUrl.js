export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  // If already absolute, return as-is
  if (/^https?:\/\//i.test(imagePath)) return imagePath;

  const base = (import.meta.env.VITE_API_BASE_URL || "")
    .replace(/\/+$/, ""); // trim trailing slashes

  const path = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${base}${path}`;
};
