import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

// Public Profile Page
export default function UserPublicProfile() {
  const { username } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/images/user/${username}`)
      .then((res) => {
        setImages(res.data || []);
      })
      .catch(() => alert("User not found"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <p className="text-center py-20 text-lg text-slate-600">
        Loading profile...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-200 to-indigo-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
            {username[0].toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              @{username}
            </h1>
            <p className="text-slate-600">
              {images.length} uploads
            </p>
          </div>
        </div>

        {/* Gallery */}
        {images.length === 0 ? (
          <p className="text-center text-slate-600">
            No images uploaded yet.
          </p>
        ) : (
          <div className="masonry">
            {images.map((img) => (
              <div
                key={img._id}
                className="mb-4 break-inside-avoid bg-white rounded-xl shadow-md overflow-hidden"
              >
                <img
                  src={img.imageUrl}   // Cloudinary URL
                  alt="user upload"
                  className="w-full hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}