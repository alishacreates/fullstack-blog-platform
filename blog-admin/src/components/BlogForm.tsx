"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";

interface BlogFormProps {
  mode?: "new" | "edit";
  initialData?: {
    title?: string;
    slug?: string;
    category?: string;
    status?: string;
    content?: string;
  };
}



export default function BlogForm({ mode = "new", initialData = {} }: BlogFormProps) {
  const router = useRouter();

  // Form state
  const [title, setTitle] = useState(initialData.title || "");
  const [slug, setSlug] = useState(initialData.slug || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState(initialData.status || "draft");
  const [content, setContent] = useState(initialData.content || "");
  const [loading, setLoading] = useState(false);

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(
      newTitle
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // spaces → hyphens
        .replace(/[^\w-]/g, "") // remove special chars
    );
  };

  const categories = [
  "Technology",
  "AI",
  "Web Development",
  "Backend",
  "Frontend",
  "Career",
  "DSA",
];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("content", content);
    formData.append("publishedAt", new Date().toISOString());

    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
          method: "POST",
          body: formData,
        });


      if (!res.ok) throw new Error("Failed to create blog");

      setLoading(false);
      router.push("/"); // redirect to blogs page
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error saving blog. Check console.");
    }
  };

  return (
    <div className="flex justify-center px-4 py-10 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-black">
          {mode === "edit" ? "Edit Blog" : "Create New Blog"}
        </h2>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-500">Title</label>
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter blog title"
            className="w-full text-black rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-var(--primary)-500"
            required
          />
        </div>

        {/* Category */}
<div className="space-y-1">
  <label className="text-sm font-medium text-gray-600">
    Category
  </label>

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full rounded-lg border px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-var(--primary)-500"
    required
  >
    <option value="" disabled>
      Select a category
    </option>

    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>


        {/* Featured Image */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="w-full rounded-lg border px-4 py-3 text-black file:mr-4 file:rounded-lg file:border-0 
                       file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold 
                       file:text-var(--primary)-700 hover:file:bg-indigo-100 focus:outline-none"
          />
          {image && <p className="text-xs text-gray-500">Selected: {image.name}</p>}
        </div>

        {/* Status */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-black w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Rich Text Editor */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-600">Content</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-6">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-var(--primary)-400 to-var(--primary)-600
                       px-7 py-3 text-sm font-semibold text-white shadow-md
                       hover:from-var(--primary)-500 hover:to-var(--primary)-700 transition active:scale-[0.98]"
          >
            {loading ? (mode === "edit" ? "Updating..." : "Saving...") : (mode === "edit" ? "Update Blog" : "Save Blog")}
          </button>
        </div>
      </form>
    </div>
  );
}
