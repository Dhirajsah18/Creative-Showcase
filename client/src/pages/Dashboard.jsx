import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl.js";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageDims, setImageDims] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadImages();
  }, []);


  // Load user's images
  async function loadImages() {
    try {
      const res = await api.get("/images/my");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Upload image
  async function handleUpload() {
    if (!file || uploading) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      await api.post("/images/upload", formData);
      await loadImages();
      setFile(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

// Delete image
  async function handleDelete(id) {
    if (!confirm("Delete this image?")) return;

    try {
      await api.delete(`/images/${id}`);
      setImages(images.filter(img => img._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-100 to-indigo-200">

      <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-6 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload New Image</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-600"
            />
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-8 py-3 rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 text-white font-medium hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            My Gallery
            <span className="text-slate-500 font-normal text-lg ml-2">({images.length})</span>
          </h2>

          {loading ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg">Loading...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg">No images yet. Upload your first image above.</p>
            </div>
          ) : (
            <div className="masonry">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="masonry-item relative group overflow-hidden rounded-2xl bg-white border border-indigo-200 shadow-md hover:shadow-2xl hover:shadow-indigo-300 transition-all duration-300"
                >
                  <img
                    src={getImageUrl(img.imageUrl)}
                    alt="uploaded"
                    className="w-full rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onLoad={(e) => {
                      const { naturalWidth, naturalHeight } = e.currentTarget;
                      setImageDims((prev) => ({
                        ...prev,
                        [img._id]: { w: naturalWidth, h: naturalHeight },
                      }));
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                  {imageDims[img._id] && (
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {imageDims[img._id].w}×{imageDims[img._id].h}
                    </div>
                  )}

                  <button
                    onClick={() => handleDelete(img._id)}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

