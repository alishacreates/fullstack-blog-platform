import { useEffect, useState } from "react";

export type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  authorImage: string;
};

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, "").trim();

export function useBlogs() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/blogs/published"
        );
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();

        const rawBlogs = Array.isArray(data)
          ? data
          : Array.isArray(data.blogs)
          ? data.blogs
          : [];

        const normalized = rawBlogs.map((blog: any) => ({
          id: blog._id,
          slug: blog.slug,
          title: blog.title || "Untitled",
          description:
            blog.excerpt ||
            (blog.content
              ? stripHtml(blog.content).slice(0, 120) + "..."
              : ""),
          category: (blog.category || "Tech").toUpperCase(),
          image: blog.image?.startsWith("http")
            ? blog.image
            : blog.image
            ? `http://localhost:5000${blog.image}`
            : "/placeholder.jpg",
          author: blog.author?.name || "Anonymous",
          date: new Date(
            blog.publishedAt || blog.createdAt
          ).toDateString(),
          readTime: blog.readingTime || "5 MIN READ",
          authorImage:
            blog.author?.avatar || "https://i.pravatar.cc/150",
        }));

        setArticles(normalized);
      } catch (err) {
        setError("Something went wrong");
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { articles, loading, error };
}
