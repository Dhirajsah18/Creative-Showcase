import { useEffect, useState } from "react";
import api from "../utils/api.js";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl.js";


export default function Landing() {
  const [images, setImages] = useState([]);

useEffect(() => {
  api.get("/images/random")
    .then(res => {
      const shuffled = [...res.data].sort(() => Math.random() - 0.5);
      setImages(shuffled);
    })
    .catch(console.log);
}, []);


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-100 to-indigo-200">
      {/* Navbar */}
      <header className="backdrop-blur-sm bg-indigo-50 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Creative Showcase
          </h1>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-lg border border-indigo-800 font-medium text-slate-700 
                         shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 
                         hover:scale-105 transition-all duration-200"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 
                         text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 
                         hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-bold text-slate-900 mb-4">
          Discover Amazing <span className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Creativity</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          Explore stunning visual content around the world
        </p>
      </section>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="masonry">
          {images.map(img => (
            <div
              key={img._id}
              className="mb-4 group overflow-hidden rounded-2xl bg-white shadow-md relative"
            >
              <img
                src={getImageUrl(img.imageUrl)}
                alt=""
                className="w-full group-hover:scale-105 transition-transform"
                loading="lazy"
              />

              {/* 👇 USER PROFILE LINK */}
              {img.username && (
                <Link
                  to={`/profile/${img.username}`}
                  className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full
                            opacity-0 group-hover:opacity-100 transition"
                >
                  @{img.username}
                </Link>
              )}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
