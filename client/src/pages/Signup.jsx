import { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

// Signup 
export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    api.post("/auth/register", form)
      .then(() => navigate("/login"))
      .catch(() => alert("Signup failed"));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue100 to-indigo-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">
              Creative Showcase
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Create Account
          </h2>
          <p className="text-slate-600">
            Start showcasing your creativity
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-indigo-500/30 border border-indigo-800 p-8">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-medium bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all duration-200"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-violet-600 transition-colors">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
