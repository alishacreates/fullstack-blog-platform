import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      default: "Anonymous",
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true } // keep an _id for each comment
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    image: String,
    publishedAt: Date,

    // ✅ NEW FIELDS
    likes: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
