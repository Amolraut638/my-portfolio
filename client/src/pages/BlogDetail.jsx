import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FiClock,
    FiCalendar,
    FiArrowLeft,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ArrowRight } from "lucide-react";

export default function BlogDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { isAdmin, token } = useAuth();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/blogs/${slug}`
                );

                setBlog(res.data);
            } catch (err) {
                console.error("Failed to fetch blog", err);
                navigate("/blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [slug, navigate]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;

        setDeleting(true);

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/blogs/${blog._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/blogs");
        } catch (err) {
            console.error("Failed to delete blog", err);
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-darkBg flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-mutedText text-sm">Loading blog...</p>
                </div>
            </div>
        );
    }

    if (!blog) return null;

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
                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => navigate("/blogs")}
                    className="flex items-center gap-2 text-mutedText hover:text-primary transition text-sm mb-8"
                >
                    <FiArrowLeft size={15} />
                    Back to Blogs
                </motion.button>

                {/* Cover Image */}
                {blog.coverImage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative h-52 sm:h-72 rounded-2xl overflow-hidden mb-8 border border-gray-800"
                    >
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-transparent to-transparent opacity-60" />
                    </motion.div>
                )}

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags?.map((tag, i) => (
                            <span
                                key={i}
                                className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lightText leading-tight mb-4">
                        {blog.title}
                    </h1>

                    {/* Meta + Admin actions */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pb-6 border-b border-gray-800">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-xs text-mutedText">
                                <FiClock size={11} className="text-primary" />
                                {blog.readTime}
                            </span>

                            <span className="flex items-center gap-1.5 text-xs text-mutedText">
                                <FiCalendar size={11} className="text-primary" />
                                {formatDate(blog.createdAt)}
                            </span>
                        </div>

                        {/* Admin buttons */}
                        {isAdmin && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => navigate(`/admin/editor/${blog._id}`)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-700 rounded-lg hover:border-primary hover:text-primary transition duration-300"
                                >
                                    <FiEdit2 size={12} />
                                    Edit
                                </button>

                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-700 rounded-lg hover:border-red-500 hover:text-red-400 transition duration-300 disabled:opacity-50"
                                >
                                    <FiTrash2 size={12} />
                                    {deleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Blog Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-8 prose prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:text-lightText prose-headings:font-bold
            prose-p:text-mutedText prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:text-accent
            prose-strong:text-lightText
            prose-code:text-primary prose-code:bg-darkCard prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs
            prose-pre:bg-darkCard prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-2xl
            prose-blockquote:border-l-primary prose-blockquote:text-mutedText
            prose-li:text-mutedText
            prose-hr:border-gray-800"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Bottom nav */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex justify-between items-center">
                    <button
                        onClick={() => navigate("/blogs")}
                        className="flex items-center gap-2 text-mutedText hover:text-primary transition text-sm"
                    >
                        <FiArrowLeft size={14} />
                        All Blogs
                    </button>

                    <a
                        href="/"
                        className="flex items-center gap-1 text-mutedText hover:text-primary transition text-sm group"
                    >
                        Portfolio <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </div>
    );
}