"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Heart, MessageCircle, ArrowLeft, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  title: string;
  category: string;
  description: string;
  image: string;
  author: string;
  date: string;
  slug: string;
  content: string;
}

export default function BlogPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").trim();


  useEffect(() => {
  if (!slug) return;

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`http://localhost:5000/api/blogs/slug/${slug}`);
      if (!res.ok) throw new Error(`Failed to fetch blog: ${res.status}`);

      const data = await res.json();

      if (!data) {
        setError("Blog not found");
        setBlog(null);
        return;
      }

      setBlog({
  title: data.title || "Untitled",
  category: data.category || "Tech",
  description:
    data.description ||
    (data.content
      ? stripHtml(data.content).slice(0, 160) + "..."
      : "No description"),
  image: data.image || "",
  author: data.author || "Anonymous",
  date: new Date(
    data.publishedAt || data.createdAt || Date.now()
  ).toDateString(),
  slug: data.slug || slug,
  content: data.content || "<p>No content available</p>",
});

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch blog");
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  fetchBlog();
}, [slug]);


  if (loading)
    return (
      <p className="py-24 text-center text-slate-500">Loading article...</p>
    );

  if (error)
    return (
      <div className="py-24 text-center text-red-500">
        {error}
        <div className="mt-4">
          <button
            onClick={() => router.push("/blogs")}
            className="rounded-lg bg-var(--primary)-500 px-4 py-2 text-white hover:bg-var(--primary)-600"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );

  if (!blog)
    return (
      <p className="py-24 text-center text-slate-500">Blog not found.</p>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-var(--primary)-50/40 to-slate-100">
      {/* Back Button */}
      <div className="mx-auto max-w-5xl px-6 pt-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-var(--primary)-600"
        >
          <ArrowLeft size={18} />
          Back to blogs
        </Link>
      </div>

      {/* Hero */}
      <article className="mx-auto mt-6 max-w-5xl px-6">
        <span className="inline-block rounded-full bg-var(--primary)-100 px-4 py-1 text-xs font-bold uppercase tracking-wide text-var(--primary)-700">
          {blog.category}
        </span>

        <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
          {blog.title}
        </h1>

      

        <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> 5 min read
          </span>
        </div>
        <br />
        {/* Image */}
        <img
  src={`http://localhost:5000${blog.image}`}
  alt={blog.title}
  className="w-full max-h-[400px] object-cover rounded-xl"
  loading="lazy"
/>
      </article>
<br />
      {/* Content */}
      <section className="mx-auto max-w-5xl px-6 ">
        <div
    className="
      prose prose-slate prose-lg max-w-none

      prose-headings:text-slate-900
      prose-h1:text-3xl
      prose-h2:text-2xl
      prose-h3:text-xl
      prose-h2:mt-10
      prose-h3:mt-6

      prose-p:leading-relaxed
      prose-p:my-4

      prose-a:text-var(--primary)-600
      prose-a:font-medium
      prose-a:underline-offset-4

      prose-strong:text-slate-900

      prose-pre:bg-slate-900
      prose-pre:text-slate-100
      prose-pre:rounded-lg
      prose-pre:p-4

      prose-code:text-var(--primary)-600
      prose-code:bg-var(--primary)-50
      prose-code:px-1
      prose-code:rounded
    "
    dangerouslySetInnerHTML={{ __html: blog.content }}
  />

        {/* Actions */}
        <div className="mt-14 flex gap-4">
          <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-700 shadow-md transition hover:border-var(--primary)-300 hover:text-var(--primary)-600">
            <Heart size={18} /> Like
          </button>

          <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 font-semibold text-slate-700 shadow-md transition hover:border-var(--primary)-300 hover:text-var(--primary)-600">
            <MessageCircle size={18} /> Comment
          </button>
        </div>

        {/* Bottom Accent */}
        <div className="mt-16 h-1 w-full max-w-5xl rounded-full bg-gradient-to-r from-var(--primary)-500 to-var(--primary)-600" />
      </section>

      {/* Comments Section */}
<section className="mx-auto mt-20 max-w-4xl px-2 pb-24">
  <h2 className="mb-4 text-2xl font-bold text-slate-900">
    Comments
  </h2>

  {/* Comment Input */}
  <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <textarea
      placeholder="Write your comment..."
      className="h-28 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-var(--primary)-500 focus:ring-2 focus:ring-var(--primary)-500/30"
    />
    <div className="mt-3 flex justify-end">
      <button className="rounded-full bg-var(--primary)-500 px-6 py-2 text-sm font-semibold text-white hover:bg-var(--primary)-600">
        Post Comment
      </button>
    </div>
  </div>

  {/* Sample Comment */}
  <div className="space-y-6">
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/40"
          className="h-9 w-9 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold text-slate-800">
            Anonymous
          </p>
          <p className="text-xs text-slate-500">
            2 hours ago
          </p>
        </div>
      </div>
      <p className="text-sm text-slate-700">
        This article was super clear and helpful. Loved the examples!
      </p>
    </div>
  </div>
</section>
    </main>
  );
}

