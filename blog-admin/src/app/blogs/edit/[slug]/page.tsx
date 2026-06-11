"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// 1️⃣ Define Blog type
interface Blog {
  title: string;
  slug: string;
  category: string;
  status: "draft" | "published";
  content: string;
  image?: string;
  publishedAt?: string;
}

export default function EditBlogPage() {
  const { slug } = useParams();
  const router = useRouter();

  // 2️⃣ blog state typed as Blog | null
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 3️⃣ Fetch blog on mount
  useEffect(() => {
    if (!slug) return;

    fetch(`http://localhost:5000/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data: Blog) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  // 4️⃣ Handle form submit with proper type
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!blog) return;

    setSaving(true);

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog),
      });

      if (!res.ok) throw new Error("Failed to update blog");
      setSaving(false);
      router.push("/"); // back to dashboard
    } catch (err) {
      console.error(err);
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading blog...</p>;
  if (!blog) return <p className="text-center mt-20 text-red-500">Blog not found</p>;

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen rounded-lg">
  <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Blog</h1>

  <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
    {/* Title */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
      <input
        type="text"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>

    {/* Slug */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
      <input
        type="text"
        value={blog.slug}
        onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
      <input
        type="text"
        value={blog.category}
        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
      <select
        value={blog.status}
        onChange={(e) => setBlog({ ...blog, status: e.target.value as "draft" | "published" })}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
      >
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
    </div>

    {/* Content */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
      <textarea
        value={blog.content}
        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-48 resize-none"
        required
      />
    </div>

    {/* Save button */}
    <div className="text-right">
      <button
        type="submit"
        disabled={saving}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
          saving ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {saving ? "Saving..." : "Update Blog"}
      </button>
    </div>
  </form>
</main>
  );
}

