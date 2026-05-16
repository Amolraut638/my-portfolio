import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FiUpload, FiX, FiSave } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "header", "bold", "italic", "underline", "strike",
  "list", "bullet", "blockquote", "code-block",
  "link", "color", "background",
];

export default function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, token } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    readTime: "5 min read",
    published: true,
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetchingBlog, setFetchingBlog] = useState(isEditing);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) navigate("/admin/login");
  }, [isAdmin]);

  // Fetch blog if editing
  useEffect(() => {
    if (!isEditing) return;
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs`
        );
        const blog = res.data.find((b) => b._id === id);
        if (blog) {
          setFormData({
            title: blog.title,
            content: blog.content || "",
            tags: blog.tags?.join(", ") || "",
            readTime: blog.readTime,
            published: blog.published,
          });
          setCoverPreview(blog.coverImage || "");
        }
      } catch (err) {
        console.error("Failed to fetch blog", err);
      } finally {
        setFetchingBlog(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append(
        "tags",
        JSON.stringify(
          formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
        )
      );
      data.append("readTime", formData.readTime);
      data.append("published", formData.published);
      if (coverImage) data.append("coverImage", coverImage);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/blogs/${id}`,
          data,
          config
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/blogs`,
          data,
          config
        );
      }
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingBlog) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-mutedText text-sm">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBg text-lightText relative">

      {/* Background glows */}
      <div className="fixed inset-0 -z-10 bg-darkBg">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div
          style={{ animationDelay: "1s" }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[120px] animate-pulse"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center gap-2 text-mutedText hover:text-primary transition text-sm mb-6"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:translate-x-1"/> Back to Blogs
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {isEditing ? "Edit " : "Write a "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isEditing ? "Blog" : "New Blog"}
            </span>
          </h1>
          <div className="h-1.5 w-12 bg-primary mt-4 rounded-full opacity-40" />
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Cover Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-mutedText ml-1">
              Cover Image
            </label>
            {coverPreview ? (
              <div className="relative h-48 rounded-2xl overflow-hidden border border-gray-800">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage(null);
                    setCoverPreview("");
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-darkBg/80 rounded-full flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition"
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer hover:border-primary/50 transition duration-300 bg-darkCard/30">
                <FiUpload size={24} className="text-mutedText mb-2" />
                <p className="text-mutedText text-sm">Click to upload cover image</p>
                <p className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-mutedText ml-1">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. System Design: How URL Shorteners Work"
              className="w-full bg-darkCard border border-gray-700 rounded-xl px-4 py-3 text-sm text-lightText focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-mutedText ml-1">
              Tags{" "}
              <span className="text-gray-600 text-xs">(comma separated)</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. System Design, Backend, Node.js"
              className="w-full bg-darkCard border border-gray-700 rounded-xl px-4 py-3 text-sm text-lightText focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Read Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-mutedText ml-1">
              Read Time
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="e.g. 5 min read"
              className="w-full bg-darkCard border border-gray-700 rounded-xl px-4 py-3 text-sm text-lightText focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Content — React Quill */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-mutedText ml-1">
              Content <span className="text-red-400">*</span>
            </label>
            <div className="rounded-2xl overflow-hidden border border-gray-700 focus-within:border-primary transition-all duration-300">
              <style>{`
                .ql-toolbar {
                  background-color: #111827 !important;
                  border: none !important;
                  border-bottom: 1px solid #1f2937 !important;
                }
                .ql-container {
                  background-color: #111827 !important;
                  border: none !important;
                  font-family: 'Space Grotesk', sans-serif !important;
                  min-height: 300px;
                }
                .ql-editor {
                  color: #E5E7EB !important;
                  font-size: 14px !important;
                  min-height: 300px;
                  padding: 16px !important;
                }
                .ql-editor.ql-blank::before {
                  color: #4B5563 !important;
                  font-style: normal !important;
                }
                .ql-stroke { stroke: #9CA3AF !important; }
                .ql-fill { fill: #9CA3AF !important; }
                .ql-picker { color: #9CA3AF !important; }
                .ql-picker-options {
                  background-color: #111827 !important;
                  border: 1px solid #1f2937 !important;
                }
                .ql-toolbar button:hover .ql-stroke,
                .ql-toolbar button.ql-active .ql-stroke {
                  stroke: #6366F1 !important;
                }
                .ql-toolbar button:hover .ql-fill,
                .ql-toolbar button.ql-active .ql-fill {
                  fill: #6366F1 !important;
                }
              `}</style>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, content: val }))
                }
                modules={modules}
                formats={formats}
                placeholder="Start writing your blog..."
              />
            </div>
          </div>

          {/* Published toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={formData.published}
              onChange={handleChange}
              className="w-4 h-4 accent-primary"
            />
            <label
              htmlFor="published"
              className="text-sm text-mutedText cursor-pointer"
            >
              Publish immediately
            </label>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm animate-pulse">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-accent transition duration-300 shadow-glow disabled:opacity-50 text-sm"
          >
            <FiSave size={16} />
            {loading
              ? isEditing
                ? "Saving..."
                : "Publishing..."
              : isEditing
              ? "Save Changes"
              : "Publish Blog"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}