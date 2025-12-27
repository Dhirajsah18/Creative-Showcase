import { useEffect, useState, useRef } from "react";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadImages();
  }, []);

  // Convert file → base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // Load images
  const loadImages = async () => {
    try {
      const res = await api.get("/images/my");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image too large (max 10MB)");
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // Upload image
  const handleUpload = async () => {
    if (!file || uploading) return;

    try {
      setUploading(true);
      const base64 = await toBase64(file);

      await api.post("/images/upload", {
        image: base64,
        mime: file.type,
      });

      setFile(null);
      setPreview(null);
      await loadImages();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;

    try {
      await api.delete(`/images/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-100 to-indigo-200">

      <header className="backdrop-blur-sm bg-indigo-50 border-b border-slate-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-xl border p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upload Image</h2>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium"
            >
              Choose Image
            </button>

            {file && (
              <span className="text-sm text-slate-600 truncate max-w-xs">
                {file.name}
              </span>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-6 py-3 rounded-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 
                         text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 
                         hover:scale-105 transition-all duration-200"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* Preview */}
          {preview && (
            <div className="mt-6">
              <p className="text-lg text-slate-500 mb-2">Preview</p>
              <img
                src={preview}
                alt="preview"
                className="max-h-60 rounded-xl border shadow"
              />
            </div>
          )}
        </div>

        {/* Gallery */}
        {loading ? (
          <p className="text-center text-slate-600">Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-center text-slate-600">
            No images uploaded yet.
          </p>
        ) : (
          <div className="masonry">
            {images.map((img) => (
              <div
                key={img._id}
                className="masonry-item relative group overflow-hidden rounded-2xl bg-white border border-indigo-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-300 transition-all duration-300"
              >
                <img
                  src={img.imageUrl}
                  alt="uploaded"
                  className="w-full rounded-2xl group-hover:scale-105 transition-transform"
                  loading="lazy"
                />

                <button
                  onClick={() => handleDelete(img._id)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-600 text-white text-xs hover:bg-red-700 px-3 py-1 rounded-full transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
