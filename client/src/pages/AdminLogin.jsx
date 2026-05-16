import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function AdminLogin() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      // Save Token
      login(res.data.token);

      // Redirect
      navigate("/blogs");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid credentials"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 bg-darkBg">

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />

        <div
          style={{ animationDelay: "1s" }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[120px] animate-pulse"
        />
      </div>

      {/* Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >

        {/* Header */}
        <div className="text-center mb-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-lightText mb-2">

            Admin{" "}

            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Login
            </span>
          </h1>

          <div className="h-1 w-12 bg-primary mx-auto mt-3 rounded-full opacity-40" />

          <p className="text-mutedText text-sm mt-4">
            Access restricted to authorized users only
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-darkCard border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}
            <div className="space-y-2">

              <label className="text-sm font-medium text-mutedText ml-1">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedText"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@email.com"
                  required
                  className="w-full bg-darkBg/50 border border-gray-700 rounded-xl pl-9 pr-4 py-3 text-sm text-lightText focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">

              <label className="text-sm font-medium text-mutedText ml-1">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedText"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full bg-darkBg/50 border border-gray-700 rounded-xl pl-9 pr-10 py-3 text-sm text-lightText focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                />

                {/* Toggle Password */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedText hover:text-lightText transition"
                >
                  {showPassword
                    ? <EyeOff size={15} />
                    : <Eye size={15} />
                  }
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm animate-pulse">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-accent transition duration-300 shadow-glow disabled:opacity-50 text-sm mt-2"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>
        </div>

        {/* Back Link */}
        <p className="text-center text-mutedText text-sm mt-6">

          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 hover:text-primary transition duration-300 group"
          >

            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Blogs
          </Link>
        </p>
      </motion.div>
    </div>
  );
}