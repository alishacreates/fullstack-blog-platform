"use client";

import { Trash2, Pencil, Plus, Eye, FileText, LayoutGrid, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// ✅ Corrected Blog interface for MongoDB
interface Blog {
  _id: string; // MongoDB ID
  slug: string;
  title: string;
  category: string;
  status: "published" | "draft";
  publishedAt: string;
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Blog[]) => {
        setBlogs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setBlogs([]);
        setLoading(false);
      });
  }, []);

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this blog?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/blogs/id/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    setBlogs(prev => prev.filter(b => b._id !== id));
  } catch (err) {
    alert("Failed to delete blog");
  }
};

  const publishedCount = blogs.filter((b) => b.status === "published").length;
  const draftCount = blogs.length - publishedCount;

  return (
    <main className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Blogs Studio</h1>
            <p className="text-muted-foreground mt-1 text-sm text-gray-500">
              Manage your technical articles and draft publications.
            </p>
          </div>
          <Link
            href="/blogs/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-amber-800 hover:shadow-md active:scale-95"
          >
            <Plus size={18} />
            Create Post
          </Link>
        </header>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Total Posts" value={blogs.length} icon={<LayoutGrid size={20} />} color="text-blue-600" />
          <StatCard label="Published" value={publishedCount} icon={<CheckCircle size={20} />} color="text-emerald-600" />
          <StatCard label="Drafts" value={draftCount} icon={<Clock size={20} />} color="text-amber-600" />
        </div>

        {/* Blog List */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="divide-y divide-gray-100">
              {[...Array(3)].map((_, i) => <SkeletonRow key={i} />)}
            </div>
          ) : blogs.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {blogs.map((blog) => (
                <li
                  key={blog._id} // ✅ use _id as key
                  className="group flex flex-col gap-4 p-4 transition-colors hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${blog.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                      <h3 className="truncate font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {blog.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 ml-5">
                      <span className="flex items-center gap-1">
                        <FileText size={13} className="text-gray-400" />
                        {blog.category}
                      </span>
                      <span>•</span>
                      <span>{blog.publishedAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <ActionButton href={`/blogs/${blog.slug}`} icon={<Eye size={16} />} label="View" />
                    <ActionButton href={`/blogs/edit/${blog.slug}`} icon={<Pencil size={16} />} label="Edit" variant="indigo" />
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm font-medium text-red-500 transition-all hover:bg-red-50 hover:border-red-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="rounded-full bg-gray-50 p-4 text-gray-400">
                <FileText size={40} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No blogs found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first post.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// --- Sub-Components ---
function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode, color: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${color} opacity-80`}>{icon}</div>
      </div>
    </div>
  );
}

function ActionButton({ href, icon, label, variant = "gray" }: { href: string; icon: React.ReactNode; label: string; variant?: "gray" | "indigo" }) {
  const styles = {
    gray: "hover:bg-gray-100 hover:text-gray-900 border-gray-200 text-gray-500",
    indigo: "hover:bg-indigo-50 hover:text-indigo-600 border-gray-200 text-gray-500 hover:border-indigo-100"
  };

  return (
    <Link
      href={href}
      className={`flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-all ${styles[variant]}`}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
}

function SkeletonRow() {
  return (
    <div className="flex animate-pulse items-center justify-between p-6">
      <div className="space-y-3">
        <div className="h-4 w-48 rounded bg-gray-200" />
        <div className="h-3 w-32 rounded bg-gray-100" />
      </div>
      <div className="flex gap-2">
        <div className="h-9 w-20 rounded-lg bg-gray-100" />
        <div className="h-9 w-20 rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}
