import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiClock, FiCalendar } from "react-icons/fi";

export default function BlogCard({ blog, index }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      className="group bg-darkCard border border-gray-800 rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-glow flex flex-col cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-4xl font-black text-primary/30">
              {blog.title?.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-darkCard via-transparent to-transparent opacity-60" />

        {/* Index badge */}
        <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-darkBg/80 border border-gray-700 flex items-center justify-center z-10">
          <span className="text-[10px] font-bold text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {blog.tags?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-lightText mb-2 group-hover:text-primary transition-colors leading-snug">
          {blog.title}
        </h3>

        {/* Meta */}
        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-gray-800/60">
          <span className="flex items-center gap-1.5 text-xs text-mutedText">
            <FiClock size={11} className="text-primary" />
            {blog.readTime}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-mutedText">
            <FiCalendar size={11} className="text-primary" />
            {formatDate(blog.createdAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}