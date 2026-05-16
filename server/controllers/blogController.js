import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";

// GET all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 })
      .select("-content");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET all blogs including drafts (admin only)
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select("-content");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, readTime, published } = req.body;

    // Auto generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    // Check slug uniqueness
    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Blog with similar title already exists" });
    }

    // Upload cover image to cloudinary if provided
    let coverImage = "";
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "portfolio-blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      coverImage = result.secure_url;
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      tags: tags ? JSON.parse(tags) : [],
      readTime: readTime || "5 min read",
      coverImage,
      published: published ?? true,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, tags, readTime, published } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Update cover image if new one uploaded
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "portfolio-blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });
      coverImage = result.secure_url;
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags ? JSON.parse(tags) : blog.tags;
    blog.readTime = readTime || blog.readTime;
    blog.published = published ?? blog.published;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};