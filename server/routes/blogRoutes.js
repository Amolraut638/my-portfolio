import express from "express";
import multer from "multer";

import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

router.post(
  "/",
  authMiddleware,
  upload.single("coverImage"),
  createBlog
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("coverImage"),
  updateBlog
);

router.delete("/:id", authMiddleware, deleteBlog);

export default router;