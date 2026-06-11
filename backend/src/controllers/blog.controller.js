import Blog from "../models/Blog.js";


/* CREATE BLOG */
export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      slug: req.body.slug,
      category: req.body.category,
      content: req.body.content,
      status: req.body.status,
      publishedAt: req.body.publishedAt,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL BLOGS (ADMIN) */
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE BLOG */
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "published" })
      .sort({ publishedAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET SINGLE BLOG BY SLUG (PUBLIC) */
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      status: "published", // important for user side
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/blogs/slug/:slug/like
export const likeBlog = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Simple version: just increment likes every time
    blog.likes = (blog.likes || 0) + 1;
    await blog.save();

    return res.json({ likes: blog.likes });
  } catch (err) {
    console.error("Error liking blog:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// POST /api/blogs/slug/:slug/comments
export const addComment = async (req, res) => {
  try {
    const { slug } = req.params;
    const { text, author } = req.body;

    console.log("Incoming comment:", { slug, text, author }); // 👈 debug

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      console.log("Blog not found for slug:", slug);
      return res.status(404).json({ message: "Blog not found" });
    }

    const comment = {
      author: author || "Anonymous",
      text: text.trim(),
      createdAt: new Date(),
    };

    blog.comments.unshift(comment);
    await blog.save();

    const latestComment = blog.comments[0];

    return res.status(201).json(latestComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    return res.status(500).json({ message: "Server error" });
  }
};