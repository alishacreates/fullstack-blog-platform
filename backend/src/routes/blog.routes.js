import express from "express";
import upload from "../middleware/upload.js";
import {
  createBlog,
  getBlogs,
  deleteBlog,
  getPublishedBlogs,
  getBlogBySlug,
  likeBlog,      // ✅ add
  addComment,    // ✅ add
} from "../controllers/blog.controller.js";

const router = express.Router();

/* -------- USER ROUTES (TOP FIRST) -------- */
router.get("/published", getPublishedBlogs);
router.get("/slug/:slug", getBlogBySlug);

// ✅ NEW: like + comments
router.post("/slug/:slug/like", likeBlog);
router.post("/slug/:slug/comments", addComment);

/* -------- ADMIN ROUTES -------- */
router.get("/", getBlogs);
router.post("/", upload.single("image"), createBlog);
router.delete("/id/:id", deleteBlog);

export default router;
