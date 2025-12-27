import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { Link } from "react-router-dom";

export default function Landing() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/images/random")
      .then((res) => {
        setImages(res.data || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-100 to-indigo-200">
      {/* Navbar */}
      <header className="backdrop-blur-sm bg-indigo-50 border-b border-slate-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Creative Showcase
          </h1>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-lg border border-indigo-800 font-medium text-slate-700 shadow-lg 
                        shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 
                        hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
          Discover Amazing{" "}
          <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Creativity
          </span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Explore stunning visual content shared by creators around the world.
        </p>

        <Link
          to="/signup"
          className="inline-block px-8 py-4 rounded-xl font-semibold
                     bg-linear-to-r from-indigo-600 to-violet-600 text-white
                     shadow-lg hover:shadow-xl hover:scale-105 transition"
        >
          Start Sharing Your Work
        </Link>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center py-20 text-slate-600">
            Loading creativity...
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-slate-600">
            No images found.
          </div>
        ) : (
          <div className="masonry">
            {images.map((img) => (
              <div
                key={img._id}
                className="mb-4 relative group overflow-hidden rounded-2xl bg-white border border-indigo-200 shadow-md
                           hover:shadow-2xl hover:shadow-indigo-300 transition"
              >
                <img
                  src={img.imageUrl}
                  alt="creative"
                  loading="lazy"
                  className="w-full group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-black/30 opacity-0 
                             group-hover:opacity-100 transition"
                />

                {/* User Profile link */}
                {img.username && (
                  <Link
                    to={`/profile/${img.username}`}
                    className="absolute bottom-3 left-3 z-10
                               bg-black/70 text-white text-xs px-3 py-1 rounded-full
                               opacity-0 group-hover:opacity-100 transition"
                  >
                    @{img.username}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
