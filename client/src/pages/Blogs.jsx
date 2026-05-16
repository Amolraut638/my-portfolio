import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPlus, FiSearch } from "react-icons/fi";
import axios from "axios";
import BlogCard from "../components/blog/BlogCard";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [allTags, setAllTags] = useState(["All"]);

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blogs`
        );

        setBlogs(res.data);
        setFiltered(res.data);

        // Extract all unique tags
        const tags = [
          "All",
          ...new Set(res.data.flatMap((b) => b.tags || [])),
        ];

        setAllTags(tags);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter by search + tag
  useEffect(() => {
    let result = blogs;

    if (selectedTag !== "All") {
      result = result.filter((b) =>
        b.tags?.includes(selectedTag)
      );
    }

    if (search.trim()) {
      result = result.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [search, selectedTag, blogs]);

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          {/* Back to portfolio */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-mutedText hover:text-primary transition text-sm mb-8"
          >
            <ArrowLeft size={14} className="transition-transform duration-300 group-hover:translate-x-1"/> Back to Portfolio
          </a>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lightText">
            My{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Blog
            </span>
          </h1>

          <div className="h-1.5 w-12 bg-primary mx-auto mt-4 rounded-full opacity-40" />

          <p className="text-mutedText text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Thoughts on system design, backend engineering, and everything I'm
            learning along the way.
          </p>
        </motion.div>

        {/* Search + Admin button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-mutedText text-sm" />

            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-darkCard border border-gray-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-lightText focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
            />
          </div>

          {/* Admin — write blog button */}
          {isAdmin && (
            <button
              onClick={() => navigate("/admin/editor")}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-accent transition duration-300 shadow-glow text-sm font-semibold whitespace-nowrap"
            >
              <FiPlus size={16} />
              Write Blog
            </button>
          )}
        </motion.div>

        {/* Tag filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition duration-200 ${
                selectedTag === tag
                  ? "bg-primary/20 border-primary text-primary"
                  : "bg-darkCard border-gray-700 text-mutedText hover:border-primary/50 hover:text-lightText"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-darkCard border border-gray-800 rounded-2xl h-64 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-mutedText text-lg">
              No blogs found.
            </p>

            <p className="text-mutedText text-sm mt-2">
              Try a different search or tag.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((blog, index) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}