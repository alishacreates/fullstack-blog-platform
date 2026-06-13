"use client";

import { Heart, MessageCircle, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  getBlogBySlug,
  likeBlog,
  addBlogComment,
  BlogComment,
} from "@/lib/api"; // 🔁 adjust path if needed

interface Blog {
  title: string;
  category: string;
  description: string;
  image: string;
  author: string;
  date: string;
  slug: string;
  content: string;
  likes?: number;
  comments?: BlogComment[];
}

interface BlogDetailsProps {
  slug: string;
}

export default function BlogDetails({ slug }: BlogDetailsProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Like state
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Comment state
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const commentsRef = useRef<HTMLDivElement | null>(null);

  const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, "").trim();

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getBlogBySlug(slug);

        if (!data) {
          setError("Blog not found");
          setBlog(null);
          return;
        }

        const normalizedBlog: Blog = {
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
          likes: data.likes ?? 0,
          comments: data.comments ?? [],
        };

        setBlog(normalizedBlog);
        setLikesCount(normalizedBlog.likes ?? 0);

        // ✅ normalize comments: _id -> id
        setComments(
          (normalizedBlog.comments ?? []).map((c: any) => ({
            id: c._id || c.id,
            author: c.author,
            text: c.text,
            createdAt: c.createdAt,
          }))
        );

        // If backend sends whether current user has liked:
        if (typeof data.userHasLiked === "boolean") {
          setIsLiked(data.userHasLiked);
        } else {
          setIsLiked(false);
        }
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

  /* ---------------- Like Logic (with API) ---------------- */

  const handleLike = async () => {
    if (!blog || likeLoading) return;
    setLikeLoading(true);

    // optimistic update
    setIsLiked((prevLiked) => {
      setLikesCount((prevCount) => prevCount + (prevLiked ? -1 : 1));
      return !prevLiked;
    });

    try {
      const res = await likeBlog(blog.slug);

      // If your API returns updated likes / status, sync with it
      if (typeof res.likes === "number") {
        setLikesCount(res.likes);
      }
      if (typeof res.userHasLiked === "boolean") {
        setIsLiked(res.userHasLiked);
      }
    } catch (err) {
      console.error(err);
      // optional rollback: just refetch blog or revert like
    } finally {
      setLikeLoading(false);
    }
  };

  /* ---------------- Comment Logic (with API) ---------------- */

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = newComment.trim();
    if (!blog || !text || commentLoading) return;

    setCommentLoading(true);

    try {
      const createdRaw = await addBlogComment(blog.slug, text);

      // ✅ normalize created comment too: _id -> id
      const created: BlogComment = {
        id: createdRaw._id || createdRaw.id,
        author: createdRaw.author,
        text: createdRaw.text,
        createdAt: createdRaw.createdAt,
      };

      // Insert at top
      setComments((prev) => [created, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      // You can show a toast/snackbar here if you use one
    } finally {
      setCommentLoading(false);
    }
  };

  const scrollToComments = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /* ---------------- Render ---------------- */

  if (loading)
    return (
      <p className="py-6 text-sm text-slate-500">Loading article...</p>
    );

  if (error)
    return (
      <p className="py-6 text-sm text-red-500">
        {error}
      </p>
    );

  if (!blog)
    return (
      <p className="py-6 text-sm text-slate-500">
        Blog not found.
      </p>
    );

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
      {/* Hero */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-var(--primary)-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-var(--primary)-700">
          {blog.category}
        </span>

        <h2 className="mt-2 text-xl font-bold leading-tight text-slate-900">
          {blog.title}
        </h2>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="font-semibold text-slate-700">{blog.author}</span>
          <span>•</span>
          <span>{blog.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={14} /> 5 min read
          </span>
        </div>
      </div>

      {/* Image */}
      {blog.image && (
        <img
          src={`http://localhost:5000${blog.image}`}
          alt={blog.title}
          className="mb-4 max-h-[300px] w-full rounded-xl object-cover"
          loading="lazy"
        />
      )}

      {/* Content */}
      <div
        className="
          prose prose-slate max-w-none text-sm

          prose-headings:text-slate-900
          prose-h2:text-lg
          prose-h3:text-base

          prose-p:leading-relaxed
          prose-p:my-3

          prose-a:text-var(--primary)-600
          prose-a:font-medium
          prose-a:underline-offset-4

          prose-strong:text-slate-900

          prose-pre:bg-slate-900
          prose-pre:text-slate-100
          prose-pre:rounded-lg
          prose-pre:p-3

          prose-code:text-var(--primary)-600
          prose-code:bg-var(--primary)-50
          prose-code:px-1
          prose-code:rounded
        "
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-var(--primary)-300 hover:text-var(--primary)-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Heart
            size={16}
            className={isLiked ? "fill-red-500 text-red-500" : "text-slate-500"}
          />
          <span>
            {likesCount} {likesCount === 1 ? "Like" : "Likes"}
          </span>
        </button>

        <button
          onClick={scrollToComments}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-var(--primary)-300 hover:text-var(--primary)-600"
        >
          <MessageCircle size={16} />
          <span>Comment</span>
        </button>
      </div>

      {/* Comments Section */}
      <div ref={commentsRef} className="mt-8 border-t border-slate-200 pt-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">
          Comments ({comments.length})
        </h3>

        {/* Comment input */}
        <form onSubmit={handleCommentSubmit} className="mb-5">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full rounded-lg border border-slate-200 p-2 text-xs outline-none focus:border-var(--primary)-500 focus:ring-2 focus:ring-var(--primary)-500/20 min-h-[70px] resize-y"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim() || commentLoading}
              className="rounded-full bg-var(--primary)-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-var(--primary)-600 disabled:cursor-not-allowed disabled:bg-var(--primary)-300"
            >
              {commentLoading ? "Posting..." : "Post Comment"}
            </button>
          </div>
        </form>

        {/* Comment list */}
        {comments.length === 0 ? (
          <p className="text-xs text-slate-500">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-slate-800">
                    {comment.author}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {comment.createdAt}
                  </p>
                </div>
                <p className="text-xs text-slate-700 whitespace-pre-line">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
