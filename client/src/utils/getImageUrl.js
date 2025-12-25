export const getImageUrl = (imagePath) => {
  // If no image path is provided
  if (!imagePath) return "";

  // If image path is already a full URL
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Get backend base URL from env
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

  // Ensure image path starts with /
  const formattedPath = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath}`;

  return `${baseUrl}${formattedPath}`;
};
