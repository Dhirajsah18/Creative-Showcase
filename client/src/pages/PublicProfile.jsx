import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { getImageUrl } from "../utils/getImageUrl";

export default function UserPublicProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/profile/${username}`)
      .then(res => {
        setUser(res.data.user);
        setImages(res.data.images);
      })
      .catch(() => alert("User not found"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading) {
    return <p className="text-center py-20 text-lg">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold">
            {user.username[0].toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-slate-500">{images.length} uploads</p>
          </div>
        </div>

        {/* Masonry / Mosaic Gallery */}
        {images.length === 0 ? (
          <p className="text-center text-slate-500">No images uploaded yet.</p>
        ) : (
          <div className="masonry">
            {images.map(img => (
              <div key={img._id} className="mb-4 break-inside-avoid">
                <img
                  src={getImageUrl(img.imageUrl)}
                  alt=""
                  className="w-full rounded-xl shadow-md hover:shadow-xl transition"
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
